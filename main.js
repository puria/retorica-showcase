const sliders = {
    "font-size": {"fvs": false, "min": 10, "max": 500, "default_value": 90, "unit": "px", "label": "Fontsize"},
    "wght": {"fvs": true, "min": 100, "max": 900, "default_value": 500, "unit": "", "label": "Type Weight", "first": true},
    "clup": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax ↑"},
    "cldw": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax ↓"},
    "clsx": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax →"},
    "cldx": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Climax ←"},
    "expd": {"fvs": true, "min": 0, "max": 900, "default_value": 0, "unit": "", "label": "Expand ↔"},
};


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
    return `<label class="radio"><input type="radio" id="${id}" name="lafont">${id}</label>`
}

function updateParagraph() {
    var userinput = document.getElementById("textInput");
    var paragraph = document.getElementById("text");
    paragraph.textContent = userinput.value.toUpperCase();
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
            <input type="range" min="${conf.min}" max="${conf.max}" value="${conf.default_value}" class="slider" id="${id}">
        </div>
        </div>`
    $("#controls").append(slider)
    $(`#${id}`).on("input", slider_handle)
}

function change_font() {
    var id =  $(this).attr('id')
    $("#text").css("font-family", id)

    $("#controls").html("")

    for (const s in tropes[id].sliders) {
        $("#controls").append(generate_slider(s, tropes[id].sliders[s]))
    }
}


$(document).ready(() => {
    for (const trope in tropes) {
        $("#fonts").append(generate_radio(trope))
    }

    $("input:radio[name=lafont]").on('change', change_font)
    $($("input:radio[name=lafont]")[3]).click();
})