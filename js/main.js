const sliders = {
    "font-size": {"fvs": false, "min": 10, "max": 500, "default_value": 90, "unit": "px", "label": "Fontsize"},
    "wght": {"fvs": true, "min": 100, "max": 900, "default_value": 500, "unit": "", "label": "Type Weight", "first": true},
    "clup": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax ↑"},
    "cldw": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax ↓"},
    "clsx": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax →"},
    "cldx": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax ←"},
    "expd": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Expand ↔"},
};

COLORS = { 
    "yellow": "rgb(255, 190, 0)",
    "purple": "rgb(100, 30, 180)",
    "green":  "rgb(0, 120, 80)",
    "red":    "rgb(220, 0, 0)"
}

COLORS_ARRAY = [ "rgb(255, 190, 0)", "rgb(100, 30, 180)", "rgb(0, 120, 80)", "rgb(220, 0, 0)" ]

const climax_sliders = {
    "font-size": {"fvs": false, "min": 10, "max": 500, "default_value": 40, "unit": "px", "label": "Fontsize"},
    "wght": {"fvs": true, "min": 100, "max": 900, "default_value": 500, "unit": "", "label": "Type Weight", "first": true},
    "clup": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax ↑"},
    "cldw": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax ↓"},
    "clsx": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax →"},
    "cldx": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax ←"},
};

const hyperbole_sliders = {
    "font-size": {"fvs": false, "min": 10, "max": 500, "default_value": 40, "unit": "px", "label": "Fontsize"},
    "iper": {"fvs": true, "min": 100, "max": 900, "default_value": 450, "unit": "", "label": "Iperbole", "first": true},
}

const expanded_sliders = {
    "font-size": {"fvs": false, "min": 10, "max": 500, "default_value": 40, "unit": "px", "label": "Fontsize"},
    "wght": {"fvs": true, "min": 100, "max": 900, "default_value": 500, "unit": "", "label": "Type Weight", "first": true},
    "expd": {"fvs": true, "min": 100, "max": 900, "default_value": 100, "unit": "", "label": "Expand ↔"},
}

const tropes = {
    "Climax": { 'sliders': climax_sliders},
    "Iperbole": { 'sliders': hyperbole_sliders},
    "Expanded": { 'sliders': expanded_sliders},
    "Variable": { 'sliders': sliders}
}

function generate_radio(id) {
    return `
    <li>
        <input type="radio" id="${id}" name="lafont">
        <label for="${id}">${id}</label>
        <div class="check"></div>
    </li>`
}

function update_label(id, value) {
    const conf = tropes[$("#text").css('font-family')].sliders[id]
    const label_element = $(`#${id}_label`)
    label_element.text(`${conf.label}: ${value}${conf.unit}`)
}

function compose_fvs() {
    let fvs_value = ""
    let conf = tropes[$("#text").css('font-family')]
    for (const slider in conf.sliders) {
        const slider_conf = conf.sliders[slider]
        if (slider_conf.fvs) {
            if (!slider_conf.first) fvs_value += ", "
            const value = $(`#${slider}`).val()
            fvs_value += `'${slider}' ${value}`
        }
    }
    return { 'font-variation-settings': fvs_value }
}

function slider_handle() {
    const id = $(this).attr('id')
    const value = $(`#${id}`).val()
    const conf = tropes[$("#text").css('font-family')].sliders[id]

    if (conf.fvs) {
        $("#text").css(compose_fvs(conf))
    } else {
        $("#text").css(id, `${value}${conf.unit}`)
    }
    update_label(id, value)
}

function generate_slider(id, conf) {
    let slider = `
        <div class="field">
        <label id="${id}_label" class="label">${conf.label}</label>
        <div class="control">
            <input type="range" min="${conf.min}" max="${conf.max}" value="${conf.default_value}" class="slider" data-fvs="${conf.fvs}" id="${id}">
        </div>
        </div>`
    $("#controls").append(slider)
    $(`#${id}`).on("input change", slider_handle)
}

function change_font() {
    var id =  $(this).attr('id')
    $("#text").css("font-family", id)
    $("#controls").html("")

    for (const s in tropes[id].sliders) {
        $("#controls").append(generate_slider(s, tropes[id].sliders[s]))
    }
}

function draw_background(random_color) {
     $("body,html").css("background-color", random_color)
     const type_color = (random_color == COLORS['yellow']) ? 'black' : 'white';
     $("body").addClass(type_color)
}

function draw_colors() {
    const color_names = Object.keys(COLORS)
    for (let i in color_names) {
        let fg_item = $(`<div class='color-item ${color_names[i]}'></div>`)
        let bg_item = fg_item.clone()
        
        fg_item.on('click', function() { $("#text").css('color', COLORS[color_names[i]]) })
        bg_item.on('click', function() { draw_background(COLORS[color_names[i]]) })
        $("#fg_color").append(fg_item)
        $("#bg_color").append(bg_item)
    }
}

function handleSuccessSound(stream) {
    window.stream = stream;
    const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
    soundMeter.connectToSource(stream, function(e) {
      if (e) {
        alert(e);
        return;
      }
      setInterval(() => {
        const sliders = $('.slider[data-fvs="true"]').last()
        sliders.each(function() {
            const el = $(this);
            el.val(el.prop('min') + (el.prop('max') - el.prop('min')) * (soundMeter.instant*2))
            el.trigger('input')
        })
        // const sliders = Object.keys(tropes[$("#text").css('font-family')].sliders)
        // const id = sliders[Math.floor(sliders.length * Math.random())]
        // if (tropes[$("#text").css('font-family')].sliders[id].fvs) {
        //     let attribute = $(`#${sliders[Math.floor(sliders.length * Math.random())]}`)
        //     console.log(tropes[$("#text").css('font-family')].sliders[id].fvs)
        //     // const current = attribute.val()
        //     const value = attribute.prop('min') + (attribute.prop('max') - attribute.prop('min')) * (soundMeter.instant * 2)
        //     // const value = current ? attribute.prop('max') * soundMeter.instant * 2 : current/soundMeter.instant;
        //     attribute.val(value)
        //     attribute.trigger('input')
        // }
      }, 50);
    });
  }
  
function handleErrorSound(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function setup_audio() {   
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioContext = new AudioContext();
    } catch (e) {
        console.log('Web Audio API not supported.');
    } 
    const constraints = window.constraints = { audio: true, video: false };
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccessSound).catch(handleErrorSound);
}
 
$(document).ready(() => {
    $("#sentence").on("keyup", ()=> { $("#text").html($("#sentence").val().toUpperCase()) }) 
    for (const trope in tropes) { $("#fonts ul").append(generate_radio(trope)) }

    $("input:radio[name=lafont]").on('change', change_font)
    $($("input:radio[name=lafont]")[3]).click()
    draw_background(COLORS_ARRAY[Math.floor(4 * Math.random())])
    draw_colors()
    setup_audio()
    $("body").on("hover", function() {
        window.audioContext.resume()
    })
})
