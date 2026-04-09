package edu.unah.hn.projecto_ingenieria.Services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import edu.unah.hn.projecto_ingenieria.DTO.BurndownDataPointDTO;
import edu.unah.hn.projecto_ingenieria.DTO.BurndownResponseDTO;

@Service
public class ExportacionReporteService {

    private static final DateTimeFormatter FORMATO_FECHA = DateTimeFormatter.ISO_LOCAL_DATE;

    public byte[] generarExcel(BurndownResponseDTO data) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Burndown Sprint");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);

            Row header = sheet.createRow(0);
            String[] columnas = { "Fecha", "Tareas Totales", "Tareas Completadas", "Tareas Restantes" };
            for (int i = 0; i < columnas.length; i++) {
                header.createCell(i).setCellValue(columnas[i]);
                header.getCell(i).setCellStyle(headerStyle);
            }

            int rowNum = 1;
            for (BurndownDataPointDTO punto : data.getPuntos()) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(punto.getFecha().format(FORMATO_FECHA));
                row.createCell(1).setCellValue(punto.getTareasTotalesEsperadas());
                row.createCell(2).setCellValue(punto.getTareasCompletadasEnDia());
                row.createCell(3).setCellValue(punto.getTareasRestantes());
            }

            for (int i = 0; i < columnas.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(baos);
            return baos.toByteArray();
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "No se pudo generar el archivo Excel", e);
        }
    }

    public byte[] generarPDF(BurndownResponseDTO data) {
        Document document = new Document();

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter.getInstance(document, baos);
            document.open();

            Paragraph titulo = new Paragraph(
                    "Reporte de Progreso del Sprint",
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16));
            titulo.setSpacingAfter(12f);
            document.add(titulo);

            PdfPTable tabla = new PdfPTable(4);
            tabla.setWidthPercentage(100);

            agregarEncabezadoTabla(tabla, "Fecha");
            agregarEncabezadoTabla(tabla, "Tareas Totales");
            agregarEncabezadoTabla(tabla, "Tareas Completadas");
            agregarEncabezadoTabla(tabla, "Tareas Restantes");

            for (BurndownDataPointDTO punto : data.getPuntos()) {
                tabla.addCell(punto.getFecha().format(FORMATO_FECHA));
                tabla.addCell(String.valueOf(punto.getTareasTotalesEsperadas()));
                tabla.addCell(String.valueOf(punto.getTareasCompletadasEnDia()));
                tabla.addCell(String.valueOf(punto.getTareasRestantes()));
            }

            document.add(tabla);
            document.close();
            return baos.toByteArray();
        } catch (DocumentException | IOException e) {
            if (document.isOpen()) {
                document.close();
            }
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "No se pudo generar el archivo PDF", e);
        }
    }

    private void agregarEncabezadoTabla(PdfPTable tabla, String texto) {
        PdfPCell cell = new PdfPCell(new Phrase(texto, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        tabla.addCell(cell);
    }
}
