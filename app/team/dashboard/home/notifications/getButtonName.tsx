'use client';
export function getButtonName (type:any) {
  let buttonName = "";
  switch (type) {
  case "IncreaseCategorySlotRequestNotification" ||
  "DecreaseCategorySlotRequestNotification" ||
  "UpgradeRequest" :
    buttonName = "ManageCategories";
    break;
  case "SendOutsPaused" ||
   "send-outs-resumed" ||
   "team-send-outs-paused" ||
   "team-send-outs-resumed" :
    buttonName = "ManageSendouts";
    break;
  case "EmailChanged":
    buttonName = "viewProfile";
    break;
  default:
    buttonName = "DefaultButtonName"; 
    break;
  }
  return buttonName;
}
