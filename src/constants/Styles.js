import Colors from './Colors'

export const flexAlign = (horizontal, vertical, flex) => ({
    display: 'flex', 
    flex: flex || 1,
    alignItems: horizontal, 
    justifyContent: vertical
})

export const bgColor = (color) => ({ backgroundColor: Colors[color] || color }) 
export const txtColor = (color) => ({ color: Colors[color] || color })
/**
 * 
 * @param {number} f : flex value 
 * @param {string} fd : flex direction value
 */
export const flex = ({f, fd}) => ({ flex: f, ...(fd ? {flexDirection: fd} : {}) })

const appButtonBlue = {
    backgroundColor: Colors.proAppsOrange,
    color: Colors.white,
    borderRadius: 10
}

export const styles = { 
    flexCenter: flexAlign('center', 'center'),
    appButtonBlue,
    appButtonWhite: {
        backgroundColor: Colors.white,
        color: Colors.proAppsOrange,
        borderRadius: 10
    },
    flexColumn: {flexDirection: "column", flex: 1},
    largeAppBlueButton: {...appButtonBlue, width: '90vw'},
    invisible: {height: 0, color: 'transparent', zIndex: -1},
    oneEmPadding: {padding: '1em'},
    beige15: {fontSize: 15, color: "beige"},
    anthraciteSegment: {backgroundColor: Colors.lightAnthracite, padding: 10, color: "#fff"},
    whiteText: {color: "#fff"},
    loginFormWrapper: {height: '30vh', marginTop: 30, textAlign: 'center'},
    parallaxBg: {height: '50vh', width: '100vw', objectFit: 'cover', opacity: .8}, 
    height30: {height: 30},
    logoSegmentWrapper: {height: '50vh', display: 'flex', justifyContent: 'center'},
    fullHeightColumn: {flexDirection: 'column', height: '100vh'},
    fontSize: (_s) => ({fontSize: _s}),

}




