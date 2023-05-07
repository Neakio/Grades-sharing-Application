import GLOBALS from "../Globals";

export const Util = {
    groupToStr(group) {
        if (group == null) return "";
        else return `${GLOBALS.GROUPS[group.level]} - ${group.name} (${group.year})`;
    },
    getRoleOptions() {
        return Object.entries(GLOBALS.USER_ROLES).map(([key, value]) => ({
            label: value,
            value: key,
        }));
    },

    getClassOptions() {
        return Object.entries(GLOBALS.GROUPS).map(([key, value]) => ({
            label: value,
            value: key,
        }));
    },
};
