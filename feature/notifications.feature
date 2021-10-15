Feature: Testing Aim Chat Random functionality

  Background:
    Given Set Default Settings.
    Given User open Aim.
#
#  Scenario: Verify that user is able to find users and start direct in the Room Members panel
#    Then Verify that Aim chat is open.
#    When Click on the Room Members on the Right panel.
#    And Enter "superadmin" in the search field.
#    Then Verify that user is found.
#    When Click on the User icon.
#    And Click on the Start Direct button.
#    Then Verify that chat with superadmin is open.
#
#  Scenario: Verify that user is able to reply on message #
#    Then Verify that Aim chat is open.
#    When Click on the last message dropdown and select reply.
#    And Click on Emoji icon and select first smile in the Smileys and People category.
#    And Click on the Reply button.
#    Then Verify that user reply on the last message.
#
#
#  Scenario: Verify that user is able to add reaction on the message
#    Then Verify that Aim chat is open.
#    When Click on the Add reaction button and select emoji.
#    Then Verify that reaction added.
#
#  Scenario: Verify that user is able to pin message
#    Then Verify that Aim chat is open.
#    When Click on the last message dropdown and select pin.
#    And Click on the Pin button.
#    Then Verify that message pinned.
#
#  Scenario: Verify that "Search for room or team members" field cannot contain invalid characters
#    Then Verify that Aim chat is open.
#    When Click on the user nickname.
#    And Click on the Notification Settings option.
#    And Click on the Add room or user button.
#    And Enter in the Search for room or team members field.

    Scenario: api
      When user click on a mute all chats button
