import { ProxyState } from "../AppState.js"
import { listsService } from "../Services/ListsService.js"
import { loadState, saveState } from "../Utils/LocalStorage.js"

function _draw() {
    let template = ''
    let lists = ProxyState.lists
    lists.forEach(list => template += list.Template)
    document.getElementById('lists').innerHTML = template
}

export default class ListsController {
    constructor() {
        ProxyState.on('lists', _draw)
        ProxyState.on('tasks', _draw)
        ProxyState.on('lists', saveState)
        ProxyState.on('tasks', saveState)

        loadState()

        // NOTE this is here so when the page first loads it draws the pizzas already in the proxystate
        _draw()

    }


    createLists() {
        // NOTE PREVENTS PAGE RELOADING
        event.preventDefault()
        let form = event.target
        // console.log(form);
        let rawList = {
            name: form.name.value,
            color: form.color.value,
            id: form.id.value
        }
        listsService.createLists(rawList)
        form.reset()
    }


    // destroy(id) {
    //     pizzasService.destroy(id)
    // }

    // addTopping(pizzaId) {
    //     event.preventDefault()
    //     let form = event.target
    //     let rawTopping = {
    //         pizzaId,
    //         name: form.topping.value
    //     }
    //     pizzasService.addTopping(rawTopping)
    //     form.reset()
    // }

    // removeTopping(id) {
    //     pizzasService.removeTopping(id)
    // }
}