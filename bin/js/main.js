Element.prototype.getElementOffset = function() {
    const bodyRect = document.body.getBoundingClientRect();
    const elementRect = this.getBoundingClientRect();
    const offsetX = elementRect.top - bodyRect.top;
    const offsetY = elementRect.left - bodyRect.left;
    return({x: offsetX, y: offsetY})
}