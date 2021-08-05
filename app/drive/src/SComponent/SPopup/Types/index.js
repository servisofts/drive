import PopupError from "./PopupError";
import PopupSusses from "./PopupSusses";

export type PopupType = "Error" | "Susses";

export const Types = {
    "Error": PopupError,
    "Susses": PopupSusses
}