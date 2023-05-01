import GLOBALS from "../Globals";

export const Util = {
    getRoleOptions() {
        return Object.entries(GLOBALS.USER_ROLES).map(([key, value]) => ({
            label: value,
            value: key,
        }));
    },
};
