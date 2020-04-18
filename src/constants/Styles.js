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

export const styles = { 
    flexCenter: flexAlign('center', 'center')

}