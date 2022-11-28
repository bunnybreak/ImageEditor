import Layers from "../layers.class.js";

export default class Frame {
    static props = {
        name: 'Frame',
        icon: '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path\n' +
            '    fill-rule="evenodd"\n' +
            '    clip-rule="evenodd"\n' +
            '    d="M11 1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V4H5V1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5V4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H4V10H1.5C1.22386 10 1 10.2239 1 10.5C1 10.7761 1.22386 11 1.5 11H4V13.5C4 13.7761 4.22386 14 4.5 14C4.77614 14 5 13.7761 5 13.5V11H10V13.5C10 13.7761 10.2239 14 10.5 14C10.7761 14 11 13.7761 11 13.5V11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H11V5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H11V1.5ZM10 10V5H5V10H10Z"\n' +
            '    fill="currentColor"/>\n' +
            '</svg>'
    };
    props = Frame.props;
    width;
    height;
    id;
    x;
    y;
    name;
    lock;
    visibility;
    ctx;

    constructor(params = {
        type: 'default',
        id: Layers.uniqueId('Frame-'),
        lock: false,
        visibility: true,
        x: 0,
        y: 0,
        backgroundColor: '#FFF',
        width: 1920,
        height: 1080,
        name: 'Frame',
    }) {
        this.type = params.type;
        this.x = params.x;
        this.id = params.id;
        this.y = params.y;
        this.backgroundColor = params.backgroundColor;
        this.width = params.width;
        this.height = params.height;
        this.name = params.name;
        this.lock = params.lock;
        this.visibility = params.visibility;
        if (this.type === 'default') {
            let count = Layers.count(Frame);
            if (this.name === 'Frame')
                this.name += ' ' + (count + 1)
            if (count > 0) {
                let lastFrame = Layers.last(Frame);
                this.x = lastFrame.x + 50 + lastFrame.width;
                this.y = lastFrame.y;
            }
        }
        //get Global CTX
        this.ctx = window.ImageEditor.ctx;
    }

    async render() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.fillStyle = 'black';
        this.ctx.font = (22 / window.ImageEditor.cameraZoom) + 'px Arial';
        this.ctx.fillText(this.name, this.x, this.y - 10);
        return this;
    }
}