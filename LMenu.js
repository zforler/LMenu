

class LMenu {
    constructor(param = {}){
        this.menuCache = []
        this.container = param.container
        this.elContainer = document.querySelector(`#${this.container}`)
        this.innerContainer = '<ul id="LMenu"></ul>'
        this.flatMenuCache = []

        this._init()
    }
    _init(){
        this.elContainer.innerHTML = this.innerContainer
        this.elInnerContainer = document.querySelector('#LMenu')
        this.elInnerContainer.onclick = function(e){
            console.log(e)
        }
    }
    render(jsonArr = []){
        this.flatMenuCache  = this._flatJson(jsonArr)
        console.log(this.flatMenuCache)
        let len = this.flatMenuCache.length
        let frag = document.createDocumentFragment();
        let temp
        for (let i = 0; i < len; i++) {
            let item = document.createElement('li')
            temp = this.flatMenuCache[i]
            item.innerText = temp.text
            item.dataset.level= temp._level
            item.classList.add('L-item')
            frag.appendChild(item)
        }
        this.elInnerContainer.appendChild(frag)
    }
    _flatJson(json, arr = [], level = 1){
        console.log(json)
        if(Array.isArray(json)){
            let len = json.length
            for (let i = 0; i < len; i++) {
                json[i]._level = level
                arr.push(json[i])
                if(json[i].node){
                    this._flatJson(json[i].node, arr, level+1)
                }
            }
        }else if(this._isObject(json)){
            json._level = level
            arr.push(json)
            if(json.node){
                this._flatJson(json.node, arr, level+1)
            }
        }
        return arr
    }

    _isObject(o){
        return Object.prototype.toString.call(o) === '[object Object]'
    }
}

let lmenu = new LMenu({
    container: 'menuc'
})

let obj = [
    {
        text: 'title1',
        node: {
            text: 'title1-2'
        }
    },
    {
        text: 'title2',
        node: [
            {
                text: 'title2-1'
            },
            {
                text: 'title2-2',
                node: {
                    text: 'title2-2-1'
                }
            }
        ]
    },
    {
        text: 'title3',
        node: [
            {
                text: 'title3-1'
            }
        ]
    },
    {
        text: 'title4'
    }
]
lmenu.render(obj)