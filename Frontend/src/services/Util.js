import GLOBALS from "../Globals";

export const Util = {
    getRoleOptions() {
        return Object.entries(GLOBALS.USER_ROLES).map(([key, value]) => ({
            label: value,
            value: key,
        }));
    },
};

export const Class = {
    getClassOptions() {
        return Object.entries(GLOBALS.GROUPS).map(([key, value]) => ({
            label: value,
            value: key,
        }));
    },
};
