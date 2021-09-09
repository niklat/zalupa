class SignInLocators {
    constructor() {
        this.Main_Input_Aim = "//i[@title ='Room members']"
        this.General_Room = "span[class = 'room-name ']"
        this.Search_Field_Room_Members_Option = "//input[@placeholder ='Search room members']"
        this.Super_Admin_Found = "//div[contains(text(),'superadmin')]"
        this.Start_Direct_Button = "//button[@class  = 'direct-message']"
        this.Super_Admin_Direct_Header = "//a[@href]//span[contains(text(), 'superadmin')]"
    }
}


module.exports = new SignInLocators();