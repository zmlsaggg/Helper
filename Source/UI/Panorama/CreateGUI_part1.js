u8R"(
$.Osiris = (function () {
  var activeTab;
  var activeSubTab = {};

  return {
    rootPanel: (function () {
      const rootPanel = $.CreatePanel('Panel', $.GetContextPanel(), 'OsirisMenuTab', {
        class: "mainmenu-content__container",
        useglobalcontext: "true",
        style: "background-color: #100b19d8; border: 1px solid #f064b6; box-shadow: 0px 0px 18px #000000cc;"
      });

      rootPanel.visible = false;
      rootPanel.SetReadyForDisplay(false);
      rootPanel.RegisterForReadyEvents(true);
      $.RegisterEventHandler('PropertyTransitionEnd', rootPanel, function (panelName, propertyName) {
        if (rootPanel.id === panelName && propertyName === 'opacity') {
          if (rootPanel.visible === true && rootPanel.BIsTransparent()) {
            rootPanel.visible = false;
            rootPanel.SetReadyForDisplay(false);
            return true;
          } else if (newPanel.visible === true) {
            $.DispatchEvent('MainMenuTabShown', 'OsirisMenuTab');
          }
        }
        return false;
      });

      return rootPanel;
    })(),
    goHome: function () {
      $.DispatchEvent('Activated', this.rootPanel.GetParent().GetParent().GetParent().FindChildInLayoutFile("MainMenuNavBarHome"), 'mouse');
    },
    addCommand: function (command, value = '') {
      var existingCommands = this.rootPanel.GetAttributeString('cmd', '');
      this.rootPanel.SetAttributeString('cmd', existingCommands + command + ' ' + value);
    },
    navigateToTab: function (tabID) {
      if (activeTab === tabID)
        return;

      if (activeTab) {
        var panelToHide = this.rootPanel.FindChildInLayoutFile(activeTab);
        panelToHide.RemoveClass('Active');
      }

      this.rootPanel.FindChildInLayoutFile(tabID + '_button').checked = true;

      activeTab = tabID;
      var activePanel = this.rootPanel.FindChildInLayoutFile(tabID);
      activePanel.AddClass('Active');
      activePanel.visible = true;
      activePanel.SetReadyForDisplay(true);
    },
    navigateToSubTab: function (tabID, subTabID) {
      if (activeSubTab[tabID] === subTabID)
        return;

      if (activeSubTab[tabID]) {
        var panelToHide = this.rootPanel.FindChildInLayoutFile(activeSubTab[tabID]);
        panelToHide.RemoveClass('Active');
      }

      this.rootPanel.FindChildInLayoutFile(subTabID + '_button').checked = true;

      activeSubTab[tabID] = subTabID;
      var activePanel = this.rootPanel.FindChildInLayoutFile(subTabID);
      activePanel.AddClass('Active');
      activePanel.visible = true;
      activePanel.SetReadyForDisplay(true);
    },
    sliderUpdated: function (tabID, sliderID, slider) {
      this.addCommand('set', tabID + '/' + sliderID + '/' + Math.floor(slider.value));
    },
    sliderTextEntryUpdated: function (tabID, sliderID, panel) {
      this.addCommand('set', tabID + '/' + sliderID + '/' + panel.text);
    }
  };
})();

(function () {
  var createNavbar = function () {
    var navbar = $.CreatePanel('Panel', $.Osiris.rootPanel, '', {
      class: "content-navbar__tabs content-navbar__tabs--noflow",
      style: "background-color: #190f22e8; border-bottom: 1px solid #f064b6;"
    });

    var leftContainer = $.CreatePanel('Panel', navbar, '', {
      style: "horizontal-align: left; flow-children: right; height: 100%; margin-left: 15px;"
    });

    var brandLabel = $.CreatePanel('Label', leftContainer, 'ZmlsagBrand', {
      text: "zmlsag",
      style: "color: #ff79c8; font-size: 22px; font-weight: bold; letter-spacing: 1px; vertical-align: center; margin-right: 18px; text-shadow: 0px 0px 8px #f064b655;"
    });

    var activeCfgNameLabel = $.CreatePanel('Label', leftContainer, 'ActiveConfigName', {
      text: "default.cfg"
    });

    activeCfgNameLabel.SetPanelEvent('onmouseover', function () { UiToolkitAPI.ShowTextTooltip('ActiveConfigName', 'Active config file. Changes are saved automatically.'); });
    activeCfgNameLabel.SetPanelEvent('onmouseout', function () { UiToolkitAPI.HideTextTooltip(); });

    var restoreDefaultsButton = $.CreatePanel('Button', leftContainer, 'RestoreDefaultsButton', {
      class: "content-navbar__tabs__btn",
      style: "margin-left: 8px;",
      onactivate: "UiToolkitAPI.ShowGenericPopupOneOptionCustomCancelBgStyle('Restore Defaults', 'Are you sure you want to restore default settings in the active config file (default.cfg)?', '', 'RESTORE DEFAULTS', function() { $.Osiris.addCommand('restore_defaults'); }, 'RETURN', function() {}, 'dim');"
    });

    restoreDefaultsButton.SetPanelEvent('onmouseover', function () { UiToolkitAPI.ShowTextTooltip('RestoreDefaultsButton', 'Restore defaults'); });
    restoreDefaultsButton.SetPanelEvent('onmouseout', function () { UiToolkitAPI.HideTextTooltip(); });

    $.CreatePanel('Image', restoreDefaultsButton, '', {
      src: "s2r://panorama/images/icons/ui/recent.vsvg",
      texturewidth: "24"
    });
  
    var centerContainer = $.CreatePanel('Panel', navbar, '', {
      class: "content-navbar__tabs__center-container",
    });

    var combatTabButton = $.CreatePanel('RadioButton', centerContainer, 'combat_button', {
      group: "SettingsNavBar",
      class: "content-navbar__tabs__btn",
      onactivate: "$.Osiris.navigateToTab('combat');"
    });

    $.CreatePanel('Label', combatTabButton, '', { text: "Combat", style: "color: #f8e5f4; font-weight: bold;" });

    var hudTabButton = $.CreatePanel('RadioButton', centerContainer, 'hud_button', {
      group: "SettingsNavBar",
      class: "content-navbar__tabs__btn",
      onactivate: "$.Osiris.navigateToTab('hud');"
    });

    $.CreatePanel('Label', hudTabButton, '', { text: "HUD", style: "color: #f8e5f4; font-weight: bold;" });

    var visualsTabButton = $.CreatePanel('RadioButton', centerContainer, 'visuals_button', {
      group: "SettingsNavBar",
      class: "content-navbar__tabs__btn",
      onactivate: "$.Osiris.navigateToTab('visuals');"
    });

    $.CreatePanel('Label', visualsTabButton, '', { text: "Visuals", style: "color: #f8e5f4; font-weight: bold;" });
    
    var soundTabButton = $.CreatePanel('RadioButton', centerContainer, 'sound_button', {
      group: "SettingsNavBar",
      class: "content-navbar__tabs__btn",
      onactivate: "$.Osiris.navigateToTab('sound');"
    });

    $.CreatePanel('Label', soundTabButton, '', { text: "Sound", style: "color: #f8e5f4; font-weight: bold;" });
    
    var autoChatTabButton = $.CreatePanel('RadioButton', centerContainer, 'auto_chat_button', {
      group: "SettingsNavBar",
      class: "content-navbar__tabs__btn",
      onactivate: "$.Osiris.navigateToTab('auto_chat');"
    });

    $.CreatePanel('Label', autoChatTabButton, '', { text: "Auto Chat", style: "color: #f8e5f4; font-weight: bold;" });

    var rightContainer = $.CreatePanel('Panel', navbar, '', {
        style: "horizontal-align: right; flow-children: right; height: 100%; margin-right: 70px;"
    });

    var unloadButton = $.CreatePanel('Button', rightContainer, 'UnloadButton', {
        class: "content-navbar__tabs__btn",
        onactivate: "UiToolkitAPI.ShowGenericPopupOneOptionCustomCancelBgStyle('Unload zmlsag', 'Are you sure you want to unload zmlsag?', '', 'UNLOAD', function() { $.Osiris.goHome(); $.Osiris.addCommand('unload'); }, 'RETURN', function() {}, 'dim');"
    });

    unloadButton.SetPanelEvent('onmouseover', function () { UiToolkitAPI.ShowTextTooltip('UnloadButton', 'Unload'); });
    unloadButton.SetPanelEvent('onmouseout', function () { UiToolkitAPI.HideTextTooltip(); });

    $.CreatePanel('Image', unloadButton, '', {
        src: "s2r://panorama/images/icons/ui/cancel.vsvg",
        texturewidth: "24",
        class: "negativeColor"
    });
  };

  var createVisualsNavbar = function () {
    var navbar = $.CreatePanel('Panel', $.Osiris.rootPanel.FindChildInLayoutFile('visuals'), '', {
      class: "content-navbar__tabs content-navbar__tabs--dark content-navbar__tabs--noflow",
      style: "background-color: #211329f5; border-bottom: 1px solid #f064b6;"
    });

    var centerContainer = $.CreatePanel('Panel', navbar, '', {
      class: "content-navbar__tabs__center-container",
    });

    var playerInfoTabButton = $.CreatePanel('RadioButton', centerContainer, 'player_info_button', {
      group: "VisualsNavBar",
      class: "content-navbar__tabs__btn",
      onactivate: "$.Osiris.navigateToSubTab('visuals', 'player_info');"
    });

    $.CreatePanel('Label', playerInfoTabButton, '', { text: "Player Info In World", style: "color: #fff0fb; font-weight: bold; font-size: 15px;" });

    var outlineGlowTabButton = $.CreatePanel('RadioButton', centerContainer, 'outline_glow_button', {
      group: "VisualsNavBar",
      class: "content-navbar__tabs__btn",
      onactivate: "$.Osiris.navigateToSubTab('visuals', 'outline_glow');"
    });

    $.CreatePanel('Label', outlineGlowTabButton, '', { text: "Outline Glow", style: "color: #fff0fb; font-weight: bold; font-size: 15px;" });

    var modelGlowTabButton = $.CreatePanel('RadioButton', centerContainer, 'model_glow_button', {
        group: "VisualsNavBar",
        class: "content-navbar__tabs__btn",
        onactivate: "$.Osiris.navigateToSubTab('visuals', 'model_glow');"
    });

    $.CreatePanel('Label', modelGlowTabButton, '', { text: "Model Glow", style: "color: #fff0fb; font-weight: bold; font-size: 15px;" });
  
    var viewmodelTabButton = $.CreatePanel('RadioButton', centerContainer, 'viewmodel_button', {
        group: "VisualsNavBar",
        class: "content-navbar__tabs__btn",
        onactivate: "$.Osiris.navigateToSubTab('visuals', 'viewmodel');"
    });

    $.CreatePanel('Label', viewmodelTabButton, '', { text: "Viewmodel", style: "color: #fff0fb; font-weight: bold; font-size: 15px;" });

    var wallhackTabButton = $.CreatePanel('RadioButton', centerContainer, 'wallhack_button', {
        group: "VisualsNavBar",
        class: "content-navbar__tabs__btn",
        onactivate: "$.Osiris.navigateToSubTab('visuals', 'wallhack');"
    });

    $.CreatePanel('Label', wallhackTabButton, '', { text: "Wallhack", style: "color: #fff0fb; font-weight: bold; font-size: 15px;" });
  };

  var createCombatNavbar = function () {
    var navbar = $.CreatePanel('Panel', $.Osiris.rootPanel.FindChildInLayoutFile('combat'), '', {
      class: "content-navbar__tabs content-navbar__tabs--dark content-navbar__tabs--noflow",
      style: "background-color: #211329; border-bottom: 1px solid #b84d91;"
    });

    var centerContainer = $.CreatePanel('Panel', navbar, '', {
      class: "content-navbar__tabs__center-container",
    });

    var sniperRiflesTabButton = $.CreatePanel('RadioButton', centerContainer, 'sniper_rifles_button', {
      group: "CombatNavBar",
      class: "content-navbar__tabs__btn",
      onactivate: "$.Osiris.navigateToSubTab('combat', 'sniper_rifles');"
    });

    $.CreatePanel('Label', sniperRiflesTabButton, '', { text: "Sniper rifles", style: "color: #f4d7ed;" });
  };

  // Decorative sunset scene: built from Panorama panels so it ships with the menu
  // and does not depend on external files or runtime downloads.
  var createSunsetBackdrop = function () {
    var scene = $.CreatePanel('Panel', $.Osiris.rootPanel, 'SunsetBackdrop', {
      hittest: 'false',
      style: "position: 0px 0px 0px; width: 100%; height: 100%; background-color: gradient(linear, 0% 0%, 0% 100%, from(#21142f), color-stop(0.48, #8e3f78), color-stop(0.76, #d66b75), to(#281b36));"
    });

    var sun = $.CreatePanel('Panel', scene, 'SunsetDisc', {
      hittest: 'false',
      style: "position: 0px 0px 0px; horizontal-align: center; vertical-align: center; margin-top: -150px; width: 190px; height: 190px; border-radius: 50%; background-color: #ffb078; box-shadow: 0px 0px 42px #ff8a9b88;"
    });

    var distantHills = $.CreatePanel('Panel', scene, 'SunsetDistantHills', {
      hittest: 'false',
      style: "position: 0px 0px 0px; width: 100%; height: 34%; vertical-align: bottom; background-color: #542b58dd;"
    });

    var village = $.CreatePanel('Panel', scene, 'SunsetVillageSilhouette', {
      hittest: 'false',
      style: "position: 0px 0px 0px; width: 100%; height: 22%; vertical-align: bottom; background-color: #171526f2;"
    });

    var buildings = [
      { x: "4%", w: "7%", h: "48%" }, { x: "13%", w: "5%", h: "72%" },
      { x: "21%", w: "9%", h: "56%" }, { x: "33%", w: "6%", h: "84%" },
      { x: "42%", w: "8%", h: "60%" }, { x: "54%", w: "6%", h: "76%" },
      { x: "64%", w: "9%", h: "52%" }, { x: "77%", w: "6%", h: "70%" },
      { x: "87%", w: "9%", h: "58%" }
    ];
    for (var i = 0; i < buildings.length; ++i) {
      var building = $.CreatePanel('Panel', village, 'SunsetBuilding' + i, {
        hittest: 'false',
        style: "position: 0px 0px 0px; x: " + buildings[i].x + "; width: " + buildings[i].w + "; height: " + buildings[i].h + "; vertical-align: bottom; background-color: #100f20;"
      });
      $.CreatePanel('Panel', building, '', {
        hittest: 'false',
        style: "width: 100%; height: 5px; vertical-align: top; background-color: #f08a9b66;"
      });
    }

    var foreground = $.CreatePanel('Panel', scene, 'SunsetForeground', {
      hittest: 'false',
      style: "position: 0px 0px 0px; width: 100%; height: 5%; vertical-align: bottom; background-color: #0c0d19;"
    });

    var fireflies = [];
    for (var j = 0; j < 5; ++j) {
      fireflies.push($.CreatePanel('Panel', scene, 'SunsetFirefly' + j, {
        hittest: 'false',
        style: "position: 0px 0px 0px; x: " + (12 + j * 17) + "%; y: " + (48 + (j % 3) * 7) + "%; width: 4px; height: 4px; border-radius: 50%; background-color: #ffd8a8; opacity: 0.25;"
      }));
    }

    var bright = false;
    var animateFireflies = function () {
      bright = !bright;
      for (var k = 0; k < fireflies.length; ++k)
        fireflies[k].style.opacity = ((k % 2 === 0) === bright) ? 0.9 : 0.2;
      $.Schedule(1.1, animateFireflies);
    };
    $.Schedule(1.1, animateFireflies);
  };

  createSunsetBackdrop();

  createNavbar();

  var settingContent = $.CreatePanel('Panel', $.Osiris.rootPanel, 'SettingsMenuContent', {
    class: "full-width full-height"
  });

  var createTab = function(tabName) {
    var tab = $.CreatePanel('Panel', settingContent, tabName, {
      useglobalcontext: "true",
      class: "SettingsMenuTab"
    });

    var content = $.CreatePanel('Panel', tab, '', {
      class: "SettingsMenuTabContent vscroll"
    });
  
    return content;
  };

  var createVisualsTab = function() {
    var tab = $.CreatePanel('Panel', settingContent, 'visuals', {
      useglobalcontext: "true",
      class: "SettingsMenuTab"
    });

    createVisualsNavbar();

    var content = $.CreatePanel('Panel', tab, '', {
      class: "full-width full-height"
    });
  
    return content;
  };

