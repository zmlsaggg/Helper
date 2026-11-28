  };

  var createGrenadeModelGlowPreview = function (parent, id, defIndex) {
    var container = $.CreatePanel('Panel', parent, '', { style: 'width: 80px; overflow: clip;' });
    var panel = $.CreatePanel('MapItemPreviewPanel', container, id, {
      map: "ui/xpshop_item",
      camera: "camera_weapon_4",
      "require-composition-layer": true,
      player: false,
      initial_entity: "item",
      mouse_rotate: false,
      sync_spawn_addons: true,
      "transparent-background": true,
      "pin-fov": "vertical",
      style: "x: -10px; horizontal-align: center; width: 200px; height: 80px;"
    });
    panel.SetItemItemId(makeFauxItemId(defIndex, 0), {});
  };
)"
// split the string literal because MSVC does not support string literals longer than 16k chars - error C2026
u8R"(
  var createSlider = function (parent, name, id, min, max) {
    var container = $.CreatePanel('Panel', parent, '', {
      class: "SettingsMenuDropdownContainer"
    });

    $.CreatePanel('Label', container, '', {
      class: "half-width",
      text: name
    });

    var sliderContainer = $.CreatePanel('Panel', container, id, {
      style: "vertical-align: center; horizontal-align: right; flow-children: right; margin-right: 8px;"
    });

    var slider = $.CreatePanel('Slider', sliderContainer, '', {
      class: "HorizontalSlider",
      style: "width: 200px; vertical-align: center;",
      direction: "horizontal"
    });

    slider.SetPanelEvent('onvaluechanged', function () { $.Osiris.sliderUpdated('visuals', id, slider); });
    slider.min = min;
    slider.max = max;
    slider.increment = 1.0;

    var textEntry = $.CreatePanel('TextEntry', sliderContainer, id + '_text', {
      maxchars: "3",
      textmode: "numeric",
      style: "width: 75px; margin-left: 10px; padding-left: 10px; text-align: center; font-size: 20px; color: #ffe8f8ff; font-weight: bold; font-family: Stratum2, notosans, 'Arial Unicode MS'; border: 2px solid #f064b655;"
    });

    textEntry.SetPanelEvent('ontextentrysubmit', function () { $.Osiris.sliderTextEntryUpdated('visuals', `${id}_text`, textEntry); });
    textEntry.SetPanelEvent('onfocus', function () { textEntry.style.backgroundColor = 'gradient(linear, 100% 0%, 0% 0%, from(#2b1732ee), color-stop(0, #49203ddd), to(#2b1732ee))'; });
    textEntry.SetPanelEvent('onblur', function () { textEntry.style.backgroundColor = 'none'; });
    textEntry.SetPanelEvent('onmouseover', function () { if (!textEntry.BHasKeyFocus()) textEntry.style.backgroundColor = 'gradient(linear, 100% 0%, 0% 0%, from(#a83e7fff), color-stop(0, #10261900), to(#a83e7f88));'; });
    textEntry.SetPanelEvent('onmouseout', function () { if (!textEntry.BHasKeyFocus()) textEntry.style.backgroundColor = 'none'; });
  }

  var createHueSlider = function (parent, name, id, min, max) {
    var container = $.CreatePanel('Panel', parent, '', {
      class: "SettingsMenuDropdownContainer"
    });

    $.CreatePanel('Label', container, '', {
      class: "half-width",
      text: name
    });

    var sliderContainer = $.CreatePanel('Panel', container, id, {
      style: "vertical-align: center; horizontal-align: right; flow-children: right; margin-right: 8px;"
    });

    var slider = $.CreatePanel('Slider', sliderContainer, '', {
      class: "HorizontalSlider",
      style: "width: 200px; vertical-align: center;",
      direction: "horizontal"
    });

    slider.min = min;
    slider.max = max;
    slider.increment = 1.0;

    var textEntry = $.CreatePanel('TextEntry', sliderContainer, id + '_text', {
      maxchars: "3",
      textmode: "numeric",
      style: "width: 75px; margin-left: 10px; padding-left: 10px; text-align: center; font-size: 20px; color: #ffe8f8ff; font-weight: bold; font-family: Stratum2, notosans, 'Arial Unicode MS'; border: 2px solid #f064b655;"
    });

    textEntry.SetPanelEvent('onfocus', function () { textEntry.style.backgroundColor = 'gradient(linear, 100% 0%, 0% 0%, from(#2b1732ee), color-stop(0, #49203ddd), to(#2b1732ee))'; });
    textEntry.SetPanelEvent('onblur', function () { textEntry.style.backgroundColor = 'none'; });
    textEntry.SetPanelEvent('onmouseover', function () { if (!textEntry.BHasKeyFocus()) textEntry.style.backgroundColor = 'gradient(linear, 100% 0%, 0% 0%, from(#a83e7fff), color-stop(0, #10261900), to(#a83e7f88));'; });
    textEntry.SetPanelEvent('onmouseout', function () { if (!textEntry.BHasKeyFocus()) textEntry.style.backgroundColor = 'none'; });

    $.CreatePanel('Panel', sliderContainer, id + '_color', {
        style: "border: 2px solid #000000a0; border-radius: 5px; margin-left: 10px; width: 25px; vertical-align: center; height: 25px;"
    });
  }
