Feature: Testing Aim Chat Random functionality

  Background:
    Given User open Aim.
    Given Set Default Settings.

#  Scenario: Verify that user is able to find users and start direct in the Room Members panel
#    Then Verify that Aim chat is open.
#    When Click on the Room Members on the Right panel.
#    And Enter "superadmin" in the search field.
#    Then Verify that user is found.
#    When Click on the User icon.
#    And Click on the Start Direct button.
#    Then Verify that chat with superadmin is open.

  Scenario: Verify that user is able to reply on message
    Then Verify that Aim chat is open.
    When Click on the last message dropdown and select reply