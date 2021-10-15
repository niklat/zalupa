class RightPanel {
    constructor() {
        this.Dropdown_Message = "(//*[@class = 'right-menu-btn '])[last()]"
        this.Last_Message_Aim_Chat = "(//*[@class = 'message-body '])[last()]"
        this.Reply_Message_Option = "//*[contains(text(),'Reply to the message')]"
        this.Reply_Message_Modal_Window = "(//*[@class = 'emo lightUp'])[1]"
        this.Reply_Button = "//button[@id = 'action-button']"
        this.Emoji1 = "//div[@class = 'emoji-mart-category'][3]//*[@class = 'emoji-mart-emoji'][1]"
        this.Last_Message_Container = "(//*[@class = 'emojione emojione-24-people _1f600 '])[last()]"
        this.Add_Reaction_Button = "(//*[@class ='right-btn-emo'])[last()]"
        this.Reaction_Panel_Last_Message = "(//*[@class ='b-reactions'])[last()]"
        this.Pin_Message_Option = "//*[contains(text(),'Pin message')]"
        this.Pin_Button = "//button[contains(text(), 'Pin')]"
        this.Pop_Up_Pinned_Message = "//div[contains(text(), 'Message has been pinned')]"
        this.User_Nick_Name= "//div[@class = 'dropdown-user-menu']"
        this.Notifications_Settings_Option = "//div[@class ='settings-nav-block']//li[1]"
        this.Room_Specific_Settings_Add_Button = "//i[@class = 'glyphicon add-room']"

            this.Search_Room_Specific_Screen = "//div[@class = 'search']//div[1]//input"
   }
}


module.exports = new RightPanel();