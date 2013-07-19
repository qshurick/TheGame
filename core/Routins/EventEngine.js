/**
 * Created with JetBrains PhpStorm.
 * User: aleksandr
 * Date: 18.07.13
 * Time: 22:12
 * To change this template use File | Settings | File Templates.
 */

var DEBUG;

function EventEngine(oDefaultContext) {
    var lEventsListeners = {};
    this.addEventListener = function(sEventName, fEventListener, oEventContext) {
        if (lEventsListeners[sEventName] === undefined) {
            lEventsListeners[sEventName] = [];
        }
        lEventsListeners[sEventName].push({
            listener: fEventListener,
            context:  oEventContext || oDefaultContext || this
        });
    };
    this.dispatchEvent = function(sEventName, oEvent) {
        if (lEventsListeners[sEventName] !== undefined) {
            for (var i = 0; i < lEventsListeners[sEventName].length; i++) {
                try {
                    lEventsListeners[sEventName][i].listener.call(
                        lEventsListeners[sEventName][i].context,
                        oEvent
                    );
                } catch (oError) {
                    if (DEBUG) {
                        console.log(oError);
                    }
                }
            }
        } else {
            if (DEBUG) {
                console.log("No listeners fo \"" + sEventName + "\"");
            }
        }
    };
    this.reset = function() {
        for (var i = 0; i < lEventsListeners[sEventName].length; i++) {
            delete lEventsListeners[sEventName][i];
        }
        lEventsListeners = void 0;
    }
}