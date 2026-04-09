package edu.unah.hn.projecto_ingenieria.Services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
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
import edu.unah.hn.projecto_ingenieria.DTO.UserReportDTO;

@Service
public class ExportacionReporteService {

    private static final DateTimeFormatter FORMATO_FECHA = DateTimeFormatter.ISO_LOCAL_DATE;

    public byte[] generarExcel(BurndownResponseDTO data, String nombreProyecto) {
    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
        Sheet sheet = workbook.createSheet("Burndown Sprint");

        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        // Fila 0 — nombre del proyecto
        Row rowProyecto = sheet.createRow(0);
        rowProyecto.createCell(0).setCellValue("Proyecto: " + nombreProyecto);

        // Fila 1 — fecha de generación
        Row rowFecha = sheet.createRow(1);
        rowFecha.createCell(0).setCellValue("Fecha de generación: " + LocalDate.now().format(FORMATO_FECHA));

        // Fila 2 — rango del sprint
        Row rowRango = sheet.createRow(2);
        rowRango.createCell(0).setCellValue("Período: " + data.getFechaInicio() + " — " + data.getFechaFin());

        // Fila 3 — porcentaje
        Row rowPorcentaje = sheet.createRow(3);
        rowPorcentaje.createCell(0).setCellValue(
                "Completitud: " + String.format("%.1f", data.getPorcentajeCompletitud()) + "%");

        // Fila 4 — vacía
        sheet.createRow(4);

        // Fila 5 — encabezados tabla
        Row header = sheet.createRow(5);
        String[] columnas = { "Fecha", "Tareas Totales", "Tareas Completadas", "Tareas Restantes" };
        for (int i = 0; i < columnas.length; i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(columnas[i]);
            cell.setCellStyle(headerStyle);
        }

        // Datos
        int rowNum = 6;
        for (BurndownDataPointDTO punto : data.getPuntos()) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(punto.getFecha().format(FORMATO_FECHA));
            row.createCell(1).setCellValue(punto.getTareasTotalesEsperadas());
            row.createCell(2).setCellValue(punto.getTareasCompletadasEnDia());
            row.createCell(3).setCellValue(punto.getTareasRestantes());
        }

        for (int i = 0; i < columnas.length; i++) sheet.autoSizeColumn(i);

        workbook.write(baos);
        return baos.toByteArray();
    } catch (IOException e) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                "No se pudo generar el archivo Excel", e);
    }
}

    public byte[] generarPDF(BurndownResponseDTO data, String nombreProyecto) {
    Document document = new Document();
    try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
        PdfWriter.getInstance(document, baos);
        document.open();

        // Nombre del proyecto
        Paragraph proyecto = new Paragraph(
                "Proyecto: " + nombreProyecto,
                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 13));
        proyecto.setSpacingAfter(6f);
        document.add(proyecto);

        // Fecha de generación
        Paragraph fechaGen = new Paragraph(
                "Fecha de generación: " + LocalDate.now().format(FORMATO_FECHA),
                FontFactory.getFont(FontFactory.HELVETICA, 10));
        fechaGen.setSpacingAfter(6f);
        document.add(fechaGen);

        // Rango del sprint
        Paragraph rango = new Paragraph(
                "Período: " + data.getFechaInicio() + " — " + data.getFechaFin(),
                FontFactory.getFont(FontFactory.HELVETICA, 10));
        rango.setSpacingAfter(6f);
        document.add(rango);

        // Porcentaje
        Paragraph porcentaje = new Paragraph(
                "Completitud del sprint: " + String.format("%.1f", data.getPorcentajeCompletitud()) + "%",
                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11));
        porcentaje.setSpacingAfter(12f);
        document.add(porcentaje);

        // Título reporte
        Paragraph titulo = new Paragraph(
                "Reporte de Progreso del Sprint",
                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16));
        titulo.setSpacingAfter(12f);
        document.add(titulo);

        // Tabla de datos
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
        if (document.isOpen()) document.close();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                "No se pudo generar el archivo PDF", e);
    }
}


    //Exportacion de reporte de usuarios
    public byte[] generarExcelUsuarios(List<UserReportDTO> usuarios, String nombreProyecto) {
    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
        Sheet sheet = workbook.createSheet("Métricas por Usuario");

        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        // Filas de encabezado del reporte
        sheet.createRow(0).createCell(0).setCellValue("Proyecto: " + nombreProyecto);
        sheet.createRow(1).createCell(0).setCellValue("Fecha de generación: " + LocalDate.now().format(FORMATO_FECHA));
        sheet.createRow(2).createCell(0).setCellValue("Reporte de Carga de Trabajo y Eficiencia del Equipo");
        sheet.createRow(3);

        // Encabezados tabla
        Row header = sheet.createRow(4);
        String[] columnas = { "Miembro", "Asignadas", "Pendientes", "En Progreso", "Finalizadas", "Eficiencia (días)" };
        for (int i = 0; i < columnas.length; i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(columnas[i]);
            cell.setCellStyle(headerStyle);
        }

        // Datos
        int rowNum = 5;
        for (UserReportDTO usuario : usuarios) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(usuario.getNombre());
            row.createCell(1).setCellValue(usuario.getTotalAsignadas());
            row.createCell(2).setCellValue(usuario.getPendientes());
            row.createCell(3).setCellValue(usuario.getEnProgreso());
            row.createCell(4).setCellValue(usuario.getFinalizadas());
            row.createCell(5).setCellValue(String.format("%.1f", usuario.getEficiencia()));
        }

        for (int i = 0; i < columnas.length; i++) sheet.autoSizeColumn(i);

        workbook.write(baos);
        return baos.toByteArray();
    } catch (IOException e) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                "No se pudo generar el archivo Excel", e);
    }
}

public byte[] generarPDFUsuarios(List<UserReportDTO> usuarios, String nombreProyecto) {
    Document document = new Document();
    try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
        PdfWriter.getInstance(document, baos);
        document.open();

        // Encabezado
        Paragraph proyecto = new Paragraph("Proyecto: " + nombreProyecto,
                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 13));
        proyecto.setSpacingAfter(6f);
        document.add(proyecto);

        Paragraph fechaGen = new Paragraph("Fecha de generación: " + LocalDate.now().format(FORMATO_FECHA),
                FontFactory.getFont(FontFactory.HELVETICA, 10));
        fechaGen.setSpacingAfter(6f);
        document.add(fechaGen);

        Paragraph titulo = new Paragraph("Reporte de Carga de Trabajo y Eficiencia del Equipo",
                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16));
        titulo.setSpacingAfter(12f);
        document.add(titulo);

        // Tabla
        PdfPTable tabla = new PdfPTable(6);
        tabla.setWidthPercentage(100);
        String[] columnas = { "Miembro", "Asignadas", "Pendientes", "En Progreso", "Finalizadas", "Eficiencia (días)" };
        for (String col : columnas) agregarEncabezadoTabla(tabla, col);

        for (UserReportDTO usuario : usuarios) {
            tabla.addCell(usuario.getNombre());
            tabla.addCell(String.valueOf(usuario.getTotalAsignadas()));
            tabla.addCell(String.valueOf(usuario.getPendientes()));
            tabla.addCell(String.valueOf(usuario.getEnProgreso()));
            tabla.addCell(String.valueOf(usuario.getFinalizadas()));
            tabla.addCell(String.format("%.1f", usuario.getEficiencia()));
        }

        document.add(tabla);
        document.close();
        return baos.toByteArray();
    } catch (DocumentException | IOException e) {
        if (document.isOpen()) document.close();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                "No se pudo generar el archivo PDF", e);
    }
}

    private void agregarEncabezadoTabla(PdfPTable tabla, String texto) {
        PdfPCell cell = new PdfPCell(new Phrase(texto, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        tabla.addCell(cell);
    }
}
