window.addEventListener("load", function () {
    document.querySelector("#three-random-words").addEventListener("click", toggle_3rw)
    document.querySelector("#generator-start").addEventListener("click", generator)
    document.querySelector("#restart").addEventListener("click", restart)
    document.querySelector("#copy").addEventListener("click", copy_to_clipboard)
    let choice_buttons = document.querySelectorAll(".generator-choice")
    for (let i = 0; i < choice_buttons.length; i++) {
        choice_buttons[i].addEventListener("click", gen_choice)
    }



})

let dropdown_toggle = false;

let list_thing = ["Apple", "Bridge", "Clock", "Diamond", "Engine", "Fountain", "Grape", "Hotel", "Igloo",
    "Jungle", "Kayak", "Lemon", "Mango", "Paint", "Queue", "Rainbow", "Silver", "Tractor", "Unicycle", "Violin",
    "Window", "Yellow", "Zygote"]
let list_person = ["Actor", "Baker", "Camel", "Dentist", "Elephant", "Farmer", "Giraffe", "Hippo", "Iguana",
    "Janitor", "Kangaroo", "Landlord", "Mayor", "Nurse", "Otter", "Parrot", "Queen", "Rabbit", "Snake", "Teacher",
    "Unicorn", "Vulture", "Waiter", "Youtuber", "Zebra"]
let list_place = ["Africa", "Birmingham", "China", "Detroit", "England", "France", "Germany", "Hawaii", "India",
    "Japan", "Kenya", "London", "Manhattan", "Nevada", "Ottawa", "Paris", "Quebec", "Russia", "Spain", "Turkey",
    "Ukraine", "Venice", "Washington", "Yorkshire", "Zambia"]
let list_action = ["Acting", "Breaking", "Catching", "Dodging", "Escaping", "Falling", "Grabbing",
    "Hiding", "Ignoring", "Jumping", "Kicking", "Leaving", "Moving", "Noticing", "Opening", "Playing",
    "Queueing", "Reaching", "Stealing", "Turning", "Using", "Visiting", "Waiting", "Yelling", "Zooming"]
let list_feeling = ["Angry", "Bloated", "Confused", "Depressed", "Excited", "Furious", "Gloomy", "Happy",
    "Irritated", "Jealous", "Lonely", "Nervous", "Optimistic", "Passionate", "Queasy", "Relieved", "Scared",
    "Troubled", "Upset", "Vexed", "Worried", "Zesty"]
let list_names = ["item", "person/animal", "place", "action word", "feeling word"]

let choices_dict = { /* Dictionary for accessing word pools by integer */
    0: list_thing,
    1: list_person,
    2: list_place,
    3: list_action,
    4: list_feeling
}

let chosen_words = []
let chosen_pools = []

function toggle_3rw(){
    if (dropdown_toggle) {  /* If body currently displayed, hide and remove active class */
        document.querySelector("#trw-explanation").style.display="none"
        if (this.classList.contains("active")) {
            this.classList.remove("active")
        }
    } else { /* Else show and add active class */
        document.querySelector("#trw-explanation").style.display="block"
        this.classList.add("active")
    }
    dropdown_toggle = !dropdown_toggle /* Toggles display boolean */
}

function generator(){
    document.querySelector("#generator-start").style.display="none"
    document.querySelector("#generator-end").style.display="none"
    document.querySelector("#generator-content").style.display="flex"
    /* Displays content, hides other screens*/


    chosen_pools.push(-1)
    let current = -1

    for (let i = 0; i < 3; i++) {     /* Chooses 3 unique word pools */
        while (chosen_pools.includes(current)) {
            current = Math.floor((Math.random() * 5))
        }
        chosen_pools.push(current)

    }
    chosen_pools.shift()
    load_question(chosen_pools[0])
}

function gen_choice(){
    chosen_words.push(this.value)
    if (chosen_pools.length > 0) {
        load_question(chosen_pools[0])
    } else {
        end_screen()
    }

    console.log(chosen_words)
    console.log(chosen_pools.length)

}

function update_header(value_int) {
    let value = list_names[value_int]
    let header = document.querySelector("#generator-header")
    if (value[0] === "a" || value[0] === "i") {
        header.textContent = "Choose an " + value
    } else {
        header.textContent = "Choose a " + value
    }
}

function load_question(value_int) {
    let word_pool = choices_dict[value_int]
    let chosen_arr = [-1]
    let current = -1
    let choice_buttons = document.querySelectorAll(".generator-choice")

    for (let i = 0; i < 4; i++) {
        while (chosen_arr.includes(current)) {
            current = Math.floor((Math.random() * word_pool.length))
        }
        chosen_arr.push(current)
        choice_buttons[i].textContent = word_pool[current]
        choice_buttons[i].value = word_pool[current]

    }
    update_header(value_int)
    chosen_pools.shift()
}

function end_screen() {
    document.querySelector("#generator-content").style.display="none"
    document.querySelector("#generator-end").style.display="flex"
    let output_node = document.querySelector("#output")
    output_node.textContent = chosen_words[0] + chosen_words[1] + chosen_words[2]
    document.querySelector("#copy").value = output_node.textContent

}

function restart() {
    chosen_words = []
    chosen_pools = []
    generator()
}

function copy_to_clipboard() {
    void navigator.clipboard.writeText(this.value);
}