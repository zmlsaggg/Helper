  };

  autoChatSend.SetPanelEvent('onactivate', function () {
    var phrase = sanitizeAutoChatPhrase(autoChatPhrase.text);
    if (!phrase.length) {
      autoChatStatus.text = 'Status: Enter a phrase first';
      return;
    }
    sendAutoChat();
    autoChatStatus.text = 'Status: Sent once';
  });

  autoChatToggle.SetPanelEvent('onactivate', function () {
    setAutoChatEnabled(!autoChatState.enabled);
  });

  autoChatChannel.SetPanelEvent('oninputsubmit', function () {
    var selected = autoChatChannel.GetSelectedIndex ? autoChatChannel.GetSelectedIndex() : 0;
    autoChatState.channel = selected === 1 ? 'say_team' : 'say';
  });

  var autoChatHint = $.CreatePanel('Label', autoChat, '', {
    text: 'Safety: minimum interval 10s; no automatic enable; stopping immediately cancels future sends.',
    style: 'color: #b994ae; margin-top: 12px;'
  });

  separator(autoChat);
    var visuals = createVisualsTab();

  var playerInfoTab = createSubTab(visuals, 'player_info');

  var playerInfo = createSection(playerInfoTab, 'Player Info In World');
  createDropDown(playerInfo, "Master Switch", 'visuals', 'player_information_through_walls', ['Enemies', 'All Players', 'Off']);

  var playerPosition = createSection(playerInfoTab, 'Player Position');
  createYesNoDropDown(playerPosition, "Show Player Position Arrow", 'visuals', 'player_info_position');
  separator(playerPosition);
  createDropDown(playerPosition, "Player Position Arrow Color", 'visuals', 'player_info_position_color', ['Player / Team Color', 'Team Color']);

  var playerHealth = createSection(playerInfoTab, 'Player Health');
  createYesNoDropDown(playerHealth, "Show Player Health", 'visuals', 'player_info_health');
  separator(playerHealth);
  createDropDown(playerHealth, "Player Health Text Color", 'visuals', 'player_info_health_color', ['Health-based', 'White']);

  var playerWeapon = createSection(playerInfoTab, 'Player Weapon');
  createYesNoDropDown(playerWeapon, "Show Player Active Weapon Icon", 'visuals', 'player_info_weapon');
  separator(playerWeapon);
  createYesNoDropDown(playerWeapon, "Show Player Active Weapon Ammo", 'visuals', 'player_info_weapon_clip');
  separator(playerWeapon);
  createYesNoDropDown(playerWeapon, 'Show Bomb Carrier Icon', 'visuals', 'player_info_bomb_carrier');
  separator(playerWeapon);
  createYesNoDropDown(playerWeapon, 'Show Bomb Planting Icon', 'visuals', 'player_info_bomb_planting');

  var playerIcons = createSection(playerInfoTab, 'Icons');
  createYesNoDropDown(playerIcons, "Show Defuse Icon", 'visuals', 'player_info_defuse');
  separator(playerIcons);
  createYesNoDropDown(playerIcons, 'Show Picking Up Hostage Icon', 'visuals', 'player_info_hostage_pickup');
  separator(playerIcons);
  createYesNoDropDown(playerIcons, 'Show Rescuing Hostage Icon', 'visuals', 'player_info_hostage_rescue');
  separator(playerIcons);
  createYesNoDropDown(playerIcons, 'Show Blinded By Flashbang Icon', 'visuals', 'player_info_blinded');

  var wallhackTab = createSubTab(visuals, 'wallhack');
  var wallhackSection = createSection(wallhackTab, 'Wallhack');
  createOnOffDropDown(wallhackSection, "Enable Wallhack", 'visuals', 'wallhack_enabled');

  var outlineGlowTab = createSubTab(visuals, 'outline_glow');

  var outlineGlow = createSection(outlineGlowTab, 'Outline Glow');
  createOnOffDropDown(outlineGlow, "Master Switch", 'visuals', 'outline_glow_enable');

  var playerOutlineGlow = createSection(outlineGlowTab, 'Players');
  createDropDown(playerOutlineGlow, "Glow Players", 'visuals', 'player_outline_glow', ['Enemies', 'All Players', 'Off']);
  separator(playerOutlineGlow);
  createDropDown(playerOutlineGlow, "Player Glow Color", 'visuals', 'player_outline_glow_color', ['Player / Team Color', 'Team Color', 'Health-based', 'Enemy / Ally']);
  separator(playerOutlineGlow);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Player Blue Hue", 'player_outline_glow_blue_hue', 191, 240);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Player Green Hue", 'player_outline_glow_green_hue', 110, 140);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Player Yellow Hue", 'player_outline_glow_yellow_hue', 47, 60);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Player Orange Hue", 'player_outline_glow_orange_hue', 11, 20);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Player Purple Hue", 'player_outline_glow_purple_hue', 250, 280);
  separator(playerOutlineGlow);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Team T Hue", 'player_outline_glow_t_hue', 30, 40);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Team CT Hue", 'player_outline_glow_ct_hue', 210, 230);
  separator(playerOutlineGlow);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "High Health Hue", 'player_outline_glow_high_hp_hue', 0, 359);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Low Health Hue", 'player_outline_glow_low_hp_hue', 0, 359);
  separator(playerOutlineGlow);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Enemy Hue", 'player_outline_glow_enemy_hue', 0, 359);
  separator(playerOutlineGlow);
  createHueSlider(playerOutlineGlow, "Ally Hue", 'player_outline_glow_ally_hue', 0, 359);

  var weaponOutlineGlow = createSection(outlineGlowTab, 'Weapons');
  createYesNoDropDown(weaponOutlineGlow, "Glow Weapons on Ground Nearby", 'visuals', 'weapon_outline_glow');
  separator(weaponOutlineGlow);
  createYesNoDropDown(weaponOutlineGlow, "Glow Grenade Projectiles", 'visuals', 'grenade_proj_outline_glow');
  separator(weaponOutlineGlow);
  separator(weaponOutlineGlow);
  createHueSlider(weaponOutlineGlow, "Flashbang Hue", 'outline_glow_flashbang_hue', 191, 250);
  separator(weaponOutlineGlow);
  createHueSlider(weaponOutlineGlow, "HE Grenade Hue", 'outline_glow_hegrenade_hue', 300, 359);
  separator(weaponOutlineGlow);
  createHueSlider(weaponOutlineGlow, "Smoke Grenade Hue", 'outline_glow_smoke_hue', 110, 140);
  separator(weaponOutlineGlow);
  createHueSlider(weaponOutlineGlow, "Molotov / Incendiary Grenade Hue", 'outline_glow_molotov_hue', 20, 60);

  var bombAndDefuseKitOutlineGlow = createSection(outlineGlowTab, 'Bomb & Defuse Kit');
  createYesNoDropDown(bombAndDefuseKitOutlineGlow, "Glow Dropped Bomb", 'visuals', 'dropped_bomb_outline_glow');
  separator(bombAndDefuseKitOutlineGlow);
  createYesNoDropDown(bombAndDefuseKitOutlineGlow, "Glow Ticking Bomb", 'visuals', 'ticking_bomb_outline_glow');
  separator(bombAndDefuseKitOutlineGlow);
  createYesNoDropDown(bombAndDefuseKitOutlineGlow, "Glow Defuse Kits on Ground Nearby", 'visuals', 'defuse_kit_outline_glow');
  separator(bombAndDefuseKitOutlineGlow);
  separator(bombAndDefuseKitOutlineGlow);
  createHueSlider(bombAndDefuseKitOutlineGlow, "Dropped Bomb Hue", 'outline_glow_dropped_bomb_hue', 0, 359);
  separator(bombAndDefuseKitOutlineGlow);
  createHueSlider(bombAndDefuseKitOutlineGlow, "Ticking Bomb Hue", 'outline_glow_ticking_bomb_hue', 0, 359);
  separator(bombAndDefuseKitOutlineGlow);
  createHueSlider(bombAndDefuseKitOutlineGlow, "Defuse Kit Hue", 'outline_glow_defuse_kit_hue', 0, 359);

  var hostageOutlineGlow = createSection(outlineGlowTab, 'Hostages');
  createYesNoDropDown(hostageOutlineGlow, "Glow Hostages", 'visuals', 'hostage_outline_glow');
  separator(hostageOutlineGlow);
  createHueSlider(hostageOutlineGlow, "Hostage Hue", 'outline_glow_hostage_hue', 0, 359);

  var _modelGlowTab = createSubTab(visuals, 'model_glow');
  _modelGlowTab.style.overflow = 'squish squish';
  _modelGlowTab.style.flowChildren = 'right';

  var modelGlowPreview = $.CreatePanel('Panel', _modelGlowTab, '', { style: 'flow-children: down;' });
  $.CreatePanel('Label', modelGlowPreview, '', { style: 'vertical-align: top; horizontal-align: center; font-size: 40;', text: 'Preview' });
  var playerModelGlowPreview = $.CreatePanel('Panel', modelGlowPreview, '', { style: 'flow-children: right; margin-top: 20px;' });
  createPlayerModelGlowPreview(playerModelGlowPreview, 'ModelGlowPreviewPlayerTT', 'ModelGlowPreviewPlayerTTLabel', 'agents/models/tm_professional/tm_professional_varf.vmdl', makeFauxItemId(7, 921));
  createPlayerModelGlowPreview(playerModelGlowPreview, 'ModelGlowPreviewPlayerCT', 'ModelGlowPreviewPlayerCTLabel', 'agents/models/ctm_st6/ctm_st6_variante.vmdl', makeFauxItemId(9, 819));

  $.CreatePanel('Label', modelGlowPreview, '', { style: 'horizontal-align: center; margin-top: 20px;', text: 'Weapons on the Ground' });

  var weaponModelGlowPreview = $.CreatePanel('Panel', modelGlowPreview, '', { style: 'flow-children: right;' });

  var modelGlowPreviewWeapon = $.CreatePanel('MapItemPreviewPanel', weaponModelGlowPreview, 'ModelGlowPreviewWeapon', {
    map: "ui/xpshop_item",
    camera: "camera_weapon_0",
    "require-composition-layer": true,
    player: false,
    initial_entity: "item",
    mouse_rotate: false,
    sync_spawn_addons: true,
    "transparent-background": true,
    "pin-fov": "vertical",
    style: "width: 400px; height: 160px;"
  });
  modelGlowPreviewWeapon.SetItemItemId(makeFauxItemId(16, 255), {});

  var grenadeModelGlowPreview = $.CreatePanel('Panel', weaponModelGlowPreview, '', { style: 'flow-children: down;' });

  var grenadeModelGlowPreviewRow1 = $.CreatePanel('Panel', grenadeModelGlowPreview, '', { style: 'flow-children: right;' });
