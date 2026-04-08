export const ROLES = ["ADMIN", "COLABORADOR", "LECTOR"];

export const ROL_BADGE_STYLES = {
    ADMIN: "bg-indigo-100 dark:bg-[#A3FF12]/15 text-indigo-600 dark:text-[#A3FF12] border border-indigo-200 dark:border-[#A3FF12]/20",
    COLABORADOR: "bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-400/20",
    LECTOR: "bg-slate-100 dark:bg-white/8 text-slate-500 dark:text-white/50 border border-slate-200 dark:border-white/10",
};

export const rolBadge = (rol) => {
    return ROL_BADGE_STYLES[rol] || ROL_BADGE_STYLES.LECTOR;
};