"use strict";


window.React = window.React || {
    componentStore: { },

    currentElementState: undefined,
    currentElement: undefined,

    called: 0,
    
    // render: function(rootComponent, target) {
    //     var index = 0;

    //     var toBeRendered = rootComponent();
    //     for (const childComponent of toBeRendered) {
    //         if (target.children) {
    //             var original = target.children[index];

    //             if (original && original.innerText != childComponent.hash) {
    //                 window.React.removeElement(original);
    //             }
    //         }
            
    //         if (window.React.componentStore[childComponent.hash] === false) {
    //             window.React.componentStore[childComponent.hash] = true;
    //             target.appendChild(childComponent.element);
    //         }

    //         index++;
    //     }

    //     for (var i = toBeRendered.length; i < target.children.length; i++) {
    //         window.React.removeElement(target.children[i]);
    //     }
    // },

    render: function(rootComponent, target) {
        debugger;
        for (const childComponent of rootComponent()) {
            console.log(childComponent);
        }
    },

    createElement: function(elementToCreate, innerText) {
        this.currentElement = undefined;
        if (typeof elementToCreate == typeof "") {
            this.currentElement = document.createElement(elementName);
            element.innerText = innerText;
        } else if (typeof elementToCreate == typeof console.log) {
            this.componentFunction = elementToCreate;
            var currentElement = this._wrappedSetFunction();
            if (this.called == 1) {
                debugger;
                this.currentElement = currentElement;
            }
        }

        return () => {
            return this.currentElement;
        }

        // var returnObj = {
        //     element: element,
        //     hash: window.React.fakehash(innerText)
        // };

        // window.React.componentStore[returnObj.hash] = 
        //     !window.React.componentStore[returnObj.hash] ? 
        //     false 
        //     : 
        //     window.React.componentStore[returnObj.hash]; // not yet renderered

        //return returnObj;
    },

    useState: function(state) {
        if (!this.currentElementState) {
            this.currentElementState = state;
        }

        return [this.currentElementState, newState => {
            if (this._diff(newState, this.currentElementState) === false) {
                this.currentElementState = newState;
                this._rerender();
            }
        }];
    },

    _rerender: function() {
        this.currentElement = this._wrappedSetFunction();
    },

    // true if same
    _diff: function(a, b) {
        return JSON.stringify(a) == JSON.stringify(b)
    },

    componentFunction: undefined,
    _wrappedSetFunction: function() {
        this.called++;
        return this.componentFunction();
    },

    fakehash: function(text) {
        return text.toLowerCase();
    },

    removeElement: function(element) {
        element && element.parentNode && element.parentNode.removeChild(element);
    }
};