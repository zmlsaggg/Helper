)"
// split the string literal because MSVC does not support string literals longer than 16k chars - error C2026
u8R"(
  var combat = createCombatTab();
  var sniperRiflesTab = createSubTab(combat, 'sniper_rifles');
  var noScope = createSection(sniperRiflesTab, 'No scope');
  separator(noScope);
  createYesNoDropDown(noScope, "Visualize Inaccuracy When Not Using a Scope", 'combat', 'no_scope_inacc_vis');

  var flyTab = createSubTab(combat, 'fly');
  var flySection = createSection(flyTab, 'Fly');
  createOnOffDropDown(flySection, "Enable Fly", 'combat', 'fly_enabled');
  separator(flySection);
  createHueSlider(flySection, "Fly Speed Multiplier", 'fly_speed_multiplier', 0.5, 5.0);
  separator(flySection);
  createDropDown(flySection, "Fly Key", 'combat', 'fly_key', ['Left Shift', 'Right Shift', 'Left Ctrl', 'Right Ctrl', 'Left Alt', 'Right Alt']);

  $.Osiris.navigateToSubTab('combat', 'sniper_rifles');

  var hud = createTab('hud');
  
  var bomb = createSection(hud, 'Bomb');
  createYesNoDropDown(bomb, "Show Bomb Explosion Countdown And Site", 'hud', 'bomb_timer');
  separator(bomb);
  createYesNoDropDown(bomb, "Show Bomb Defuse Countdown", 'hud', 'defusing_alert');
  separator(bomb);
  createYesNoDropDown(bomb, "Show Bomb Plant Alert", 'hud', 'bomb_plant_alert');

  var killfeed = createSection(hud, 'Killfeed');
  separator(killfeed);
  createYesNoDropDown(killfeed, "Preserve My Killfeed During The Round", 'hud', 'preserve_killfeed');

  var time = createSection(hud, 'Time');
  separator(time);
  createYesNoDropDown(time, "Show Post-round Timer", 'hud', 'postround_timer');

  var autoChat = createTab('auto_chat');

  var autoChatState = {
    enabled: false,
    interval: 30,
    channel: 'say',
    generation: 0
  };

  var autoChatStatus = $.CreatePanel('Label', autoChat, '', {
    text: 'Status: Off',
    style: 'font-size: 18px; color: #f4d7ed; margin-bottom: 10px;'
  });

  var autoChatSection = createSection(autoChat, 'Auto Chat');
  $.CreatePanel('Label', autoChatSection, '', {
    text: 'Sends one user-entered phrase at a conservative interval. Disabled by default.',
    style: 'color: #d7b8cf; margin-bottom: 10px;'
  });

  var autoChatPhraseContainer = $.CreatePanel('Panel', autoChatSection, '', {
    class: 'SettingsMenuDropdownContainer'
  });

  $.CreatePanel('Label', autoChatPhraseContainer, '', {
    class: 'half-width',
    text: 'Phrase'
  });

  var autoChatPhrase = $.CreatePanel('TextEntry', autoChatPhraseContainer, 'AutoChatPhrase', {
    maxchars: '127',
    style: 'width: 420px; margin-left: 10px; padding-left: 10px; color: #ffe8f8ff; font-size: 18px; border: 2px solid #f064b655;'
  });
  autoChatPhrase.text = 'GLHF';

  separator(autoChatSection);

  var autoChatIntervalContainer = $.CreatePanel('Panel', autoChatSection, '', {
    class: 'SettingsMenuDropdownContainer'
  });
  $.CreatePanel('Label', autoChatIntervalContainer, '', {
    class: 'half-width',
    text: 'Interval'
  });

  var autoChatIntervalButtons = $.CreatePanel('Panel', autoChatIntervalContainer, '', {
    style: 'flow-children: right;'
  });
  var autoChatIntervals = [10, 30, 60, 120];
  for (let i = 0; i < autoChatIntervals.length; ++i) {
    (function (seconds) {
      var button = $.CreatePanel('Button', autoChatIntervalButtons, '', {
        class: 'content-navbar__tabs__btn',
        style: 'margin: 2px; padding: 5px 9px;'
      });
      $.CreatePanel('Label', button, '', {
        text: seconds + 's',
        style: 'color: #fff0fb; font-weight: bold;'
      });
      button.SetPanelEvent('onactivate', function () {
        autoChatState.interval = seconds;
        autoChatStatus.text = autoChatState.enabled
          ? 'Status: On — next message in ' + autoChatState.interval + 's'
          : 'Status: Off — interval ' + autoChatState.interval + 's';
      });
    })(autoChatIntervals[i]);
  }

  separator(autoChatSection);

  var autoChatChannelContainer = $.CreatePanel('Panel', autoChatSection, '', {
    class: 'SettingsMenuDropdownContainer'
  });
  $.CreatePanel('Label', autoChatChannelContainer, '', {
    class: 'half-width',
    text: 'Channel'
  });

  var autoChatChannelButtons = $.CreatePanel('Panel', autoChatChannelContainer, '', {
    style: 'flow-children: right;'
  });

  var allChatButton = $.CreatePanel('Button', autoChatChannelButtons, '', {
    class: 'content-navbar__tabs__btn',
    style: 'margin: 2px; padding: 5px 9px;'
  });
  $.CreatePanel('Label', allChatButton, '', {
    text: 'All chat',
    style: 'color: #fff0fb; font-weight: bold;'
  });
  allChatButton.SetPanelEvent('onactivate', function () {
    autoChatState.channel = 'say';
    autoChatStatus.text = autoChatState.enabled ? 'Status: On — All chat' : 'Status: Off — All chat';
  });

  var teamChatButton = $.CreatePanel('Button', autoChatChannelButtons, '', {
    class: 'content-navbar__tabs__btn',
    style: 'margin: 2px; padding: 5px 9px;'
  });
  $.CreatePanel('Label', teamChatButton, '', {
    text: 'Team chat',
    style: 'color: #fff0fb; font-weight: bold;'
  });
  teamChatButton.SetPanelEvent('onactivate', function () {
    autoChatState.channel = 'say_team';
    autoChatStatus.text = autoChatState.enabled ? 'Status: On — Team chat' : 'Status: Off — Team chat';
  });

  separator(autoChatSection);

  var autoChatSend = $.CreatePanel('Button', autoChatSection, 'AutoChatSendNow', {
    class: 'content-navbar__tabs__btn',
    style: 'margin-top: 10px; padding: 8px 14px;'
  });
  $.CreatePanel('Label', autoChatSend, '', {
    text: 'Send once',
    style: 'color: #fff0fb; font-weight: bold;'
  });

  var autoChatToggle = $.CreatePanel('Button', autoChatSection, 'AutoChatToggle', {
    class: 'content-navbar__tabs__btn',
    style: 'margin-left: 8px; margin-top: 10px; padding: 8px 14px;'
  });
  var autoChatToggleLabel = $.CreatePanel('Label', autoChatToggle, '', {
    text: 'Start Auto Chat',
    style: 'color: #fff0fb; font-weight: bold;'
  });

  var sanitizeAutoChatPhrase = function (value) {
    return (value || '').replace(/[\\r\\n;"']/g, '').slice(0, 127);
  };

  var sendAutoChat = function () {
    var phrase = sanitizeAutoChatPhrase(autoChatPhrase.text);
    if (!phrase.length)
      return false;

    var channel = autoChatState.channel;
    GameInterfaceAPI.ConsoleCommand(channel + ' "' + phrase + '"');
    return true;
  };

  var scheduleAutoChat = function (generation) {
    $.Schedule(autoChatState.interval, function () {
      if (!autoChatState.enabled || generation !== autoChatState.generation)
        return;

      sendAutoChat();
      scheduleAutoChat(generation);
    });
  };

  var setAutoChatEnabled = function (enabled) {
    autoChatState.generation++;
    autoChatState.enabled = enabled;
    autoChatToggleLabel.text = enabled ? 'Stop Auto Chat' : 'Start Auto Chat';
    autoChatStatus.text = enabled ? 'Status: On — next message in ' + autoChatState.interval + 's' : 'Status: Off';

    if (enabled)
      scheduleAutoChat(autoChatState.generation);
