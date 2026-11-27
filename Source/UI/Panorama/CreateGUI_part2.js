  createGrenadeModelGlowPreview(grenadeModelGlowPreviewRow1, 'ModelGlowPreviewFlashbang', 43);
  createGrenadeModelGlowPreview(grenadeModelGlowPreviewRow1, 'ModelGlowPreviewHEGrenade', 44);

  var grenadeModelGlowPreviewRow2 = $.CreatePanel('Panel', grenadeModelGlowPreview, '', { style: 'flow-children: right;' });
  createGrenadeModelGlowPreview(grenadeModelGlowPreviewRow2, 'ModelGlowPreviewSmoke', 45);
  createGrenadeModelGlowPreview(grenadeModelGlowPreviewRow2, 'ModelGlowPreviewIncendiary', 48);

  var modelGlowTab = $.CreatePanel('Panel', _modelGlowTab, '', { style: 'flow-children: down; margin-right: 40px; overflow: squish scroll;' });

  var modelGlow = createSection(modelGlowTab, 'Model Glow');
  createOnOffDropDown(modelGlow, "Master Switch", 'visuals', 'model_glow_enable');

  var playerModelGlow = createSection(modelGlowTab, 'Players');
  createDropDown(playerModelGlow, "Glow Player Models", 'visuals', 'player_model_glow', ['Enemies', 'All Players', 'Off']);
  separator(playerModelGlow);
  createDropDown(playerModelGlow, "Player Model Glow Color Mode", 'visuals', 'player_model_glow_color', ['Player / Team Color', 'Team Color', 'Health-based', 'Enemy / Ally']);
  separator(playerModelGlow);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Player Blue Hue", 'player_model_glow_blue_hue', 191, 240);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Player Green Hue", 'player_model_glow_green_hue', 110, 140);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Player Yellow Hue", 'player_model_glow_yellow_hue', 47, 60);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Player Orange Hue", 'player_model_glow_orange_hue', 11, 20);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Player Purple Hue", 'player_model_glow_purple_hue', 250, 280);
  separator(playerModelGlow);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Team T Hue", 'player_model_glow_t_hue', 30, 40);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Team CT Hue", 'player_model_glow_ct_hue', 210, 230);
  separator(playerModelGlow);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "High Health Hue", 'player_model_glow_high_hp_hue', 0, 359);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Low Health Hue", 'player_model_glow_low_hp_hue', 0, 359);
  separator(playerModelGlow);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Enemy Hue", 'player_model_glow_enemy_hue', 0, 359);
  separator(playerModelGlow);
  createHueSlider(playerModelGlow, "Ally Hue", 'player_model_glow_ally_hue', 0, 359);
)"
// split the string literal because MSVC does not support string literals longer than 16k chars - error C2026
u8R"(
  var weaponModelGlow = createSection(modelGlowTab, 'Weapons');
  createYesNoDropDown(weaponModelGlow, "Glow Weapon Models on Ground", 'visuals', 'weapon_model_glow');
  separator(weaponModelGlow);
  createYesNoDropDown(weaponModelGlow, "Glow Grenade Projectile Models", 'visuals', 'grenade_proj_model_glow');
  separator(weaponModelGlow);
  separator(weaponModelGlow);
  createHueSlider(weaponModelGlow, "Flashbang Hue", 'model_glow_flashbang_hue', 191, 250);
  separator(weaponModelGlow);
  createHueSlider(weaponModelGlow, "HE Grenade Hue", 'model_glow_hegrenade_hue', 300, 359);
  separator(weaponModelGlow);
  createHueSlider(weaponModelGlow, "Smoke Grenade Hue", 'model_glow_smoke_hue', 110, 140);
  separator(weaponModelGlow);
  createHueSlider(weaponModelGlow, "Molotov / Incendiary Grenade Hue", 'model_glow_molotov_hue', 20, 60);

  var bombModelGlow = createSection(modelGlowTab, 'Bomb & Defuse Kit');
  createYesNoDropDown(bombModelGlow, "Glow Dropped Bomb Model", 'visuals', 'dropped_bomb_model_glow');
  separator(bombModelGlow);
  createYesNoDropDown(bombModelGlow, "Glow Ticking Bomb Model", 'visuals', 'ticking_bomb_model_glow');
  separator(bombModelGlow);
  createYesNoDropDown(bombModelGlow, "Glow Defuse Kit Models on Ground", 'visuals', 'defuse_kit_model_glow');
  separator(bombModelGlow);
  separator(bombModelGlow);
  createHueSlider(bombModelGlow, "Dropped Bomb Hue", 'model_glow_dropped_bomb_hue', 0, 359);
  separator(bombModelGlow);
  createHueSlider(bombModelGlow, "Ticking Bomb Hue", 'model_glow_ticking_bomb_hue', 0, 359);
  separator(bombModelGlow);
  createHueSlider(bombModelGlow, "Defuse Kit Hue", 'model_glow_defuse_kit_hue', 0, 359);

  var _viewmodelTab = createSubTab(visuals, 'viewmodel');
  _viewmodelTab.style.overflow = 'squish squish';
  _viewmodelTab.style.flowChildren = 'right';

  var viewmodelPreviewContainer = $.CreatePanel('Panel', _viewmodelTab, '', { style: 'flow-children: down;' });
  $.CreatePanel('Label', viewmodelPreviewContainer, '', { style: 'vertical-align: top; horizontal-align: center; font-size: 40;', text: 'Preview' });

  var viewmodelPreview = $.CreatePanel('MapItemPreviewPanel', viewmodelPreviewContainer, 'ViewmodelPreview', {
    map: "ui/xpshop_item",
    camera: "camera_weapon_0",
    "require-composition-layer": true,
    player: false,
    initial_entity: "item",
    mouse_rotate: false,
    sync_spawn_addons: true,
    "transparent-background": true,
    "pin-fov": "vertical",
    style: "width: 700px; height: 400px;"
  });
  viewmodelPreview.SetHideStaticGeometry(true);
  viewmodelPreview.SetItemItemId(makeFauxItemId(16, 0), {});

  // Local preview only: these controls change the menu preview and never equip items in a live match.
  var previewModelSelector = $.CreatePanel('Panel', viewmodelPreviewContainer, '', {
    style: 'flow-children: down; width: 700px; margin-top: 8px;'
  });

  var previewCategoryButtons = $.CreatePanel('Panel', previewModelSelector, '', {
    style: 'flow-children: right; horizontal-align: center;'
  });
  var previewCategoryContent = $.CreatePanel('Panel', previewModelSelector, '', {
    style: 'width: 100%; height: 190px; overflow: squish scroll;'
  });

  var previewCategories = [];
  var selectPreviewCategory = function (selectedIndex) {
    for (var i = 0; i < previewCategories.length; ++i)
      previewCategories[i].panel.visible = i === selectedIndex;
  };

  var addPreviewCategory = function (label, items) {
    var index = previewCategories.length;
    var categoryButton = $.CreatePanel('Button', previewCategoryButtons, '', {
      class: 'content-navbar__tabs__btn',
      style: 'margin: 3px; padding: 5px 10px; background-color: #2a1730; border: 1px solid #f064b688;'
    });
    $.CreatePanel('Label', categoryButton, '', {
      text: label,
      style: 'color: #fff0fb; font-weight: bold;'
    });

    var categoryPanel = $.CreatePanel('Panel', previewCategoryContent, '', {
      style: 'width: 100%; flow-children: down;'
    });
    previewCategories.push({ panel: categoryPanel });
    categoryButton.SetPanelEvent('onactivate', function () { selectPreviewCategory(index); });

    var itemRow;
    for (var j = 0; j < items.length; ++j) {
      if (j % 5 === 0)
        itemRow = $.CreatePanel('Panel', categoryPanel, '', { style: 'width: 100%; flow-children: right;' });
      (function (item, row) {
        var itemButton = $.CreatePanel('Button', row, '', {
          class: 'content-navbar__tabs__btn',
          style: 'margin: 3px; padding: 5px 9px; background-color: #211329; border: 1px solid #78406e;'
        });
        $.CreatePanel('Label', itemButton, '', {
          text: item.label,
          style: 'color: #fff0fb; font-weight: bold;'
        });
        itemButton.SetPanelEvent('onactivate', function () {
          viewmodelPreview.SetItemItemId(makeFauxItemId(item.defIndex, item.paintKit || 0), {});
        });
      })(items[j], itemRow);
    }
  };

  addPreviewCategory('Rifles', [
    { label: 'AK-47', defIndex: 7 },
    { label: 'M4A4', defIndex: 16 },
    { label: 'M4A1-S', defIndex: 60 },
    { label: 'Galil AR', defIndex: 13 },
    { label: 'FAMAS', defIndex: 10 },
    { label: 'AUG', defIndex: 8 },
    { label: 'SG 553', defIndex: 39 }
  ]);

  addPreviewCategory('Snipers', [
    { label: 'AWP', defIndex: 9 },
    { label: 'SSG 08', defIndex: 40 },
    { label: 'SCAR-20', defIndex: 38 },
    { label: 'G3SG1', defIndex: 11 }
  ]);

  addPreviewCategory('SMGs & Heavy', [
    { label: 'MP9', defIndex: 34 },
    { label: 'MAC-10', defIndex: 17 },
    { label: 'MP7', defIndex: 33 },
    { label: 'MP5-SD', defIndex: 23 },
    { label: 'UMP-45', defIndex: 24 },
    { label: 'P90', defIndex: 19 },
    { label: 'PP-Bizon', defIndex: 26 },
    { label: 'Nova', defIndex: 35 },
    { label: 'XM1014', defIndex: 25 },
    { label: 'MAG-7', defIndex: 27 },
    { label: 'Sawed-Off', defIndex: 29 },
    { label: 'M249', defIndex: 14 },
    { label: 'Negev', defIndex: 28 }
  ]);

  addPreviewCategory('Pistols & Knives', [
    { label: 'Glock-18', defIndex: 4 },
    { label: 'USP-S', defIndex: 61 },
    { label: 'P2000', defIndex: 32 },
    { label: 'Desert Eagle', defIndex: 1 },
    { label: 'P250', defIndex: 36 },
    { label: 'Five-SeveN', defIndex: 3 },
    { label: 'Tec-9', defIndex: 30 },
    { label: 'CZ75-Auto', defIndex: 63 },
    { label: 'R8 Revolver', defIndex: 64 },
    { label: 'M9 Bayonet', defIndex: 508, paintKit: 413 },
    { label: 'Knife', defIndex: 42 }
  ]);

  // Only paint kits already defined and verified in this repository are offered.
  var previewPaintOptions = $.CreatePanel('Panel', previewModelSelector, '', {
    style: 'flow-children: right; horizontal-align: center; margin-top: 5px;'
  });
  var paintLabel = $.CreatePanel('Label', previewPaintOptions, '', {
    text: 'Known finishes:',
    style: 'color: #f4d7ed; vertical-align: center; margin-right: 6px;'
  });
  var asiimovButton = $.CreatePanel('Button', previewPaintOptions, '', {
    class: 'content-navbar__tabs__btn',
    style: 'margin: 3px; padding: 4px 8px; background-color: #211329; border: 1px solid #78406e;'
  });
  $.CreatePanel('Label', asiimovButton, '', { text: 'M4A4 Asiimov', style: 'color: #fff0fb;' });
  asiimovButton.SetPanelEvent('onactivate', function () {
    viewmodelPreview.SetItemItemId(makeFauxItemId(16, 255), {});
  });
  var marbleFadeButton = $.CreatePanel('Button', previewPaintOptions, '', {
    class: 'content-navbar__tabs__btn',
    style: 'margin: 3px; padding: 4px 8px; background-color: #211329; border: 1px solid #78406e;'
  });
  $.CreatePanel('Label', marbleFadeButton, '', { text: 'M9 Marble Fade', style: 'color: #fff0fb;' });
  marbleFadeButton.SetPanelEvent('onactivate', function () {
    viewmodelPreview.SetItemItemId(makeFauxItemId(508, 413), {});
  });

  selectPreviewCategory(0);

  var viewmodelTab = $.CreatePanel('Panel', _viewmodelTab, '', { style: 'flow-children: down; margin-right: 40px; overflow: squish scroll;' });

  var viewmodelModification = createSection(viewmodelTab, 'Viewmodel Modification');
  createOnOffDropDown(viewmodelModification, "Master Switch", 'visuals', 'viewmodel_mod');

  var viewmodelFov = createSection(viewmodelTab, 'Viewmodel Fov');
  createYesNoDropDown(viewmodelFov, "Modify Viewmodel Fov", 'visuals', 'viewmodel_fov_mod');
  separator(viewmodelFov);
  createSlider(viewmodelFov, "Fov", 'viewmodel_fov', 40, 90);

  $.Osiris.navigateToSubTab('visuals', 'player_info');

  var sound = createTab('sound');
  
  var playerSoundVisualization = createSection(sound, 'Player Sound Visualization');
  separator(playerSoundVisualization);
  createYesNoDropDown(playerSoundVisualization, "Visualize Player Footstep Sound", 'sound', 'visualize_player_footsteps');

  var bombSoundVisualization = createSection(sound, 'Bomb Sound Visualization');
  createYesNoDropDown(bombSoundVisualization, "Visualize Bomb Plant Sound", 'sound', 'visualize_bomb_plant');
  separator(bombSoundVisualization);
  createYesNoDropDown(bombSoundVisualization, "Visualize Bomb Beep Sound", 'sound', 'visualize_bomb_beep');
  separator(bombSoundVisualization);
  createYesNoDropDown(bombSoundVisualization, "Visualize Bomb Defuse Sound", 'sound', 'visualize_bomb_defuse');

  var weaponSoundVisualization = createSection(sound, 'Weapon Sound Visualization');
  createYesNoDropDown(weaponSoundVisualization, "Visualize Weapon Scope Sound", 'sound', 'visualize_scope_sound');
  separator(weaponSoundVisualization);
  createYesNoDropDown(weaponSoundVisualization, "Visualize Weapon Reload Sound", 'sound', 'visualize_reload_sound');

  $.Osiris.navigateToTab('hud');
})();
)"
