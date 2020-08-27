window.React = window.React || {
    componentStore: { },

    render: function(rootComponent, target) {
        var index = 0;

        var toBeRendered = rootComponent();
        for (const childComponent of toBeRendered) {
            if (target.children) {
                var original = target.children[index];

                if (original && original.innerText != childComponent.hash) {
                    window.React.removeElement(original);
                }
            }
            
            if (window.React.componentStore[childComponent.hash] === false) {
                window.React.componentStore[childComponent.hash] = true;
                target.appendChild(childComponent.element);
            }

            index++;
        }

        for (var i = toBeRendered.length; i < target.children.length; i++) {
            window.React.removeElement(target.children[i]);
        }
    },

    createElement: function(elementName, innerText) {
        var element = document.createElement(elementName);
        element.innerText = innerText;

        var returnObj = {
            element: element,
            hash: window.React.fakehash(innerText)
        };

        window.React.componentStore[returnObj.hash] = 
            !window.React.componentStore[returnObj.hash] ? 
            false 
            : 
            window.React.componentStore[returnObj.hash]; // not yet renderered

        return returnObj;
    },

    fakehash: function(text) {
        return text.toLowerCase();
    },

    removeElement: function(element) {
        element && element.parentNode && element.parentNode.removeChild(element);
    }
};

// 1 2 
// 2 3
// 3

// 2 2 
// 3 3

// 123 13