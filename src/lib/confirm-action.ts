export const handleSettingListingType = (type: string) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("listingType", type);
  }
};