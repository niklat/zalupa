class RightPanel {
    constructor() {
        this.Dropdown_Message = "(//*[@class = 'right-menu-btn '])[last()]"
        this.Last_Message_Aim_Chat = "(//*[@class = 'message-body '])[last()]"
        this.Reply_Message_Option = "//*[contains(text(),'Reply to the message')]"
        this.Main_Input_Filed = "(//*[@id = 'send-message-input'])[last()]"
        this.Send_Message_Button = "(//div[@class = \"send-form\"])[last()]"
   }
}


module.exports = new RightPanel();