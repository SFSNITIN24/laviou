import { ConfirmationComponentProps } from "./types/items.types";

const confirmationTypeData: Record<string, ConfirmationComponentProps> = {
  gift: {
    title: "This item has been set aside to be gifted.",
    subtitle: "Its story remains preserved.",
    helperText: "Nothing else is required right now.",
  },
  sell: {
    title: "This item has been prepared for sale.",
    subtitle: "Its story will remain part of its record.",
    helperText: "You can decide how and when to sell later.",
    buttonText2: "Marketplace Preview",
    buttonHref2: "/marketplace",
  },
  archive: {
    title: "This item has been archived.",
    subtitle: "Its story is preserved, even as it rests.",
    helperText: "You can restore it to your Museum at any time.",
  },
  donate: {
    title: "This item has been prepared for donation.",
    subtitle: "Its meaning stays with it.",
    helperText: "You can choose where and when to donate later.",
    buttonText2: "Donation Routing",
    buttonHref2: "/donations/make-donation",
  },
  keep: {
    title: "This item will remain part of your Museum",
    subtitle: "You can return to it at any time.",
    helperText: "Nothing else is required right now.",
  },
};

export { confirmationTypeData };
