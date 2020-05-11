import crypto from "crypto"

import { PROAPPS_API_DEV, PROAPPS_API_PROD } from "./Constants"
const PROAPPS_API = window.location.hostname === 'localhost' ? PROAPPS_API_DEV : PROAPPS_API_PROD

const mimeTypes = {
    image : 'bmp jpg png gif x-icon ief jpeg svg tiff',
    video: 'jpm x-m4v x-ms-asf wmv mpeg mp4 webm quicktime vnd.vivo 3gpp 3gpp2',
    text : 'html plain-base x-c css csv js ejs calendar x-java-source.java n3 richtext tab-separated-value plain',
    audio: 'x-wav x-ms-wma midi basic mpeg3 x-mpeg3 mp3 wav'
}


const Utils = {
    mimeTypes,
    mapStateToProps : (state) => {
        return state
    },
    keyExtractor : () => Math.floor(Math.random() * (10000000000)),
    isJSON : (supJSON) => {
        try {
            let json = JSON.parse(supJSON) 
            return json
    
        } catch(err) {
            return(false)
        }
    },
   
    /**
     * @dev sort any array of numbers (default behavior : INCREASING from lowest to highest)
     * ## param (object) properties :
     *  - data (array) : an array of numbers to sort
     *  - decreasing (bool) : overwrite default behavior sorting from highest to lowest  (default: false)
     * @return (array) array of sorted stringified data 
     */
    sortNumsBy : async({data, decreasing}) => {
        const sorter = await Promise.resolve(
            decreasing
            ? (a, b) => b - a
            : (a, b) => a - b
        );

        let sorted = await Promise.resolve(
            data.sort(sorter).map((n) => n.toString())
        );

        return sorted;
    },

    /**
     * @dev sort any data in an array from lowest to highest(numbers) or from a to z(strings)
     * @param {array} source array of any
     * @param {string} prop *opt* name of the property of objects from source to use for sorting (only if source has an 'object' true type)
     * @return {array} alphabetically/mathematically sorted array 
     */
    sorting : async(source, prop) => {
        const isObj = await Promise.resolve(Utils.ofType(source[0]) === 'object');

        let res = await Promise.resolve(
            source.sort((a, b) => {
                let aProp = isObj ? a[prop].toLowerCase() : a;
                let bProp = isObj ? b[prop].toLowerCase() : b;
                
                return(
                    aProp < bProp
                    ? -1
                    : (
                        aProp > bProp
                        ? 1
                        : 0
                    )
                )
            })
        );
                
        return res;
    },

    removeProp: async(prop, obj) => new Promise((resolve) => {
        let keys = Object.keys(obj)
        let clean = {};

        keys.forEach((k, ki) => {
            if (k!==prop) {
                clean[k] = obj[k]
            }
            if (ki === keys.length - 1)
                resolve(clean)
        })
    }),

    /**
     * @param {function} condition a Promise if asyncMode or a regular function : ({key, value}) => boolean
     * @param {object} obj the object to remove props of
     * @param {boolean} asyncMode indicate if condition returns a promise
     * @return {object} a version of param 'obj' respecting condition
     */
    removeProps: (condition, obj, asyncMode) => new Promise(async(resolve) => {
        let keys = Object.keys(obj)
        let clean = {};

        if (keys && keys.length) {
            let keptKeys = await new Promise(async(_kk) => {
                if (asyncMode) {
                    let _keptKeys = await Promise.resolve(keys.map((k) => condition({key: k, value: obj[k]})))
                    let resolved = await Promise.all(_keptKeys)
                    let keptKeys = await Promise.resolve(keys.filter((k, ki) => resolved[ki]))
                    _kk(keptKeys)
                } else {
                    let keptKeys = await Promise.resolve(keys.filter((k) => condition({key: k, value: obj[k]})))
                    _kk(keptKeys)

                }
            })
            if (keptKeys && keptKeys.length) {
                keptKeys.forEach(async(_k, _ki) => {
                    clean[_k] = await Promise.resolve(obj[_k]);

                    if (_ki === keptKeys.length-1)
                        resolve(clean);
                })
            } else resolve(clean)
        } else resolve(clean)

    }),

    /**
     * @return the real type of a variable (object distinction btw 'object' and 'array') 
     **/ 
    ofType : (elem) => {
        return(
            ((_e) => {

                let t = typeof _e 

                if (!_e) 
                    return 'undefined' 

                else if (t === 'object') 
                    return typeof _e.length !== 'undefined' ? 'array' : 'object'

                else return t

            })(elem)
        )
    },

    /**
     * @param {any} any variable to test
     * @param {string} restrict *option* restrict test to a specific type 
     * @return {boolean} indicating if variable is valid
     */
    validVariable : async(any, restrict) => {
        let type = Utils.ofType(any);
        let valid = await Promise.resolve(
            ((t) => (
        
                (t === "string" || t === 'array')
                ? (any.length ? any.length > 0 : false)
                : (
                    t === 'object'
                ? (Object.keys(any) && Object.keys(any).length > 0)
                : (
                        t === 'number'
                    ? any > 0
                    : false
                    )
                )
            ))(type)
        )
        return (
            restrict 
            ? (valid && (type === restrict))
            : valid
        )
    },

    /**
     * @param {string} uri 
     * @return {string|undefined} an extension found in the uri
     */
    uriExtension : (uri) => (
        uri && uri.length > 4
        ? (uri.slice(-4).match('.') ? uri.slice(-3) : uri.slice(-4)).toLowerCase()
        : undefined
    ),

    /**
     * @param {string} uri
     * @return {String} Promise resolving to a valid mime-type computed from the uri extension
     */
    mimeTypeFromUri : (uri) => {
        return new Promise(async(resolve) => {
            if (!uri) return undefined
            else {
                
                let ext = await Promise.resolve(Utils.uriExtension(uri))
                let keys = await Promise.resolve(Object.keys(mimeTypes))

                for (var k of keys) {
                    if (mimeTypes[k].indexOf(ext) >= 0) {
                        let key = await Promise.resolve(`${k}/${ext}`)
                        resolve(key)
                    }
                    else if (k === keys[keys.length-1])
                        resolve(`application/${ext}`)
                }
            }
        })
    },

   

    /**
     * Fetch Pro Apps server /api routes with a specific request, method, body(post datas)
     * @param {object} fetchConfig {body, request, method, token}
     * @param {object} options
     *  - acceptHeader (string) : set an Accept header 
     *  - returnStatus (bool) : will add a 'status' key to return object 
     * @return {object} {error, response, status(*opt*)}
     */
    fetchApi : async(fetchConfig, options) => {
        console.log('fetchConfig', fetchConfig)
console.log('process.env', process.env)
        const returnStatus = options && options.returnStatus
        const {body, request, method, token} = fetchConfig
        const dateNow = Date.now()
        const noTokenRequests = {
            "LOGIN": true,
            "WAKE_UP": true,
            "CREATE_TESTER_ACCOUNT": true,
            "REPORT": true
        }

        if(!token && !noTokenRequests[request]) 
            return ({
                error: 'missing access token', 
                ...(returnStatus ? {status: 403} : {})
            })
        else {
            let url = await Promise.resolve(`${PROAPPS_API}?request=${request}&token=${token}`)
            const isPost = await Promise.resolve((method && method.toLowerCase() === 'post') || !method); 
            let fetchOptions = await Promise.resolve(
                {
                    method: method || 'POST',
                    mode: 'cors',
                    headers: isPost
                        ? {
                        Accept: (options && options.acceptHeader) || 'application/json',
                        'Content-Type': 'application/json',
                        }
                        :undefined,
        
                    body: isPost 
                        ? JSON.stringify({...body, addedOn: dateNow})
                        : undefined
                }
            )
            console.log('url', url)
            let fetching = await fetch(url, fetchOptions)

            let error = await Promise.resolve(!fetching.ok)
        
            let response = !error && await Promise.resolve(fetching.json());


            return (
                returnStatus
                ? {response, error, status: fetching.status}
                : {response, error}
            );
        }
    },

    /**
     * @dev Find duplicated properties in objects within an array, and keep only one occurence of it (highest index)
     * @param {array} arr an array of objects{} to find duplicated properties in its occurences
     * @param {string} propName a string representing the duplicated property to eliminate
     * @param {bool} numberType indicate that supposed duplicate has a number type (required if number type is the targeted propName)
     * @return {array} 
     *  - if duplicate has been found : an array containing only the last occurence of its duplicates (indexed) 
     *  - else the 'arr' argument
     */
    removeDuplicates : async(arr, propName, numberType) => {
        let conditionsPromises = await Promise.resolve(
            arr.map(async(e, i) => {
                let typeSpec = await Promise.resolve(numberType ? `${e[propName]}` : `"${e[propName]}"`);
                let fulfilled = await Promise.resolve(!JSON.stringify(arr.slice(i+1)).includes(`"${propName}":${typeSpec}`))
                return fulfilled;
            })
        );
        
        const conditions = await Promise.all(conditionsPromises);
        
        //filter
        const removed = await Promise.resolve(arr.filter((e, i) => conditions[i]));
        
        return removed;
    },

    /**
     * @dev defines weither or not an object property has a valid value within an object (all nested objects properties PROOF)
     * @return {boolean} weither or not the object contains a prop(argument) that has a valid value 
     */
    hasValidPropValue : ({object, prop}) => {
        return new Promise(async(resolve) => {
            const propProof = `"${prop}":`;    
            const afterValue = ',"';
        
            const json = await Promise.resolve(
                typeof object === 'string'
                ? object
                : await Promise.resolve(JSON.stringify(object))
            )
        
            const splitted = json.split(propProof);
            if (splitted.length) {
            //something has been found
                const val = splitted[1];
                if (!val) resolve(false)
                else {
                    const endIndex = val.indexOf(afterValue)
                    const dirtyValue = val.slice(0, endIndex)
                    const value = dirtyValue.replace("/", "").replace('""', "")
                    const isValidPropValue = await Promise.resolve(
                        value.length > 0 
                        && value !== "}"  
                        && value.replace('}', "") !== 'null' 
                        && value.replace('}', "") !== 'undefined'
                    )
                    resolve(isValidPropValue)
                }
            } else {
            // nothing has been found
                resolve(false)
            }
        })
    },

    /**
     * @dev extract props from object depending on condition fulfilled testing each properties
     * @prop {object} object to test all keys from
     * @prop {promise} condition a function returning a promise resolving to a boolean indicating if object property needs to be extracted (see notice)
     * @notice condition example : async({prop, value, index}) => prop === 'mySuperProp' && value > 1
     * @return {array} the extracted values from object 
     */
    extractProps : ({object, condition}) => new Promise(async(resolve) => {
		const extracteds = [];
    
		const keys = Object.keys(object);
        const mapPromises = await Promise.resolve(
            keys.map(async(k, ki) => { 
            let fulfilled = await condition({prop: k, value: object[k], index: ki});
            return fulfilled === true;
            })
        
        );
        const mapped = await Promise.all(mapPromises);
        
        const filtered = await Promise.resolve(
            keys.filter((k, ki) => mapped[ki])
        );
        
        
        filtered.forEach(async(f, fi) => {
            await Promise.resolve(extracteds.push(object[f]));
        if (fi === filtered.length-1) resolve(extracteds);
        })
    }),

    /**
     * @dev Builds a ranked object from an array
     * @param {array} array source array of objects{} to build output from (ex. : [{...evaluation}, ...])
     * @param {string|number} prop the prop to find within array recurrences objects and to use its value as property for output 
     * @param {string|number} subProp to look into array[index][prop][subProp]
     * @param {string|number} elemProp to push array[index][elemProp] iso array[index] in final object
     * @return {object} the new build object built from params settings (all prop values will be an array of elements)
     * ex.: 
        objectFromArray(
    	    [{'one': 1, 'two': 2}, {_one: "ONE", two: "TWO"}, {one: 11, two: 22}],
            'one'
        )
        // result //
        {
            "1": [
                {
                "one": 1,
                "two": 2
                }
            ],
            "11": [
                {
                "one": 11,
                "two": 22
                }
            ]
        }
     * 
     */
    objectFromArray : (array, prop, subProp, elemProp) => {
        return new Promise(async(resolve) => {
            let obj = {};
        
            for (let element of array) {
                element[prop] && await new Promise(async(_ok) => {
                    let key = await Promise.resolve(subProp ? element[prop][subProp] : element[prop])
                    obj[key] = await Promise.resolve(obj[key] || []);
                    let pushed = await Promise.resolve(obj[key].push(elemProp ? element[elemProp] : element));
                    _ok(pushed)
                })
            }
            
            setTimeout(() => {
                resolve(obj)
            })
            
        })
    },

    arrayFromObject : (object) => {
        if (Utils.ofType(object) === 'object') {
            let keys = Object.keys(object)
            return keys.map((k) => object[k])
        } else return []
    },

    /**
     * @dev Extract an item from a provided array in specific conditions
     * @param {array} array : source array containing any item
     * @param {promise} extract : an async function indicating if the item needs to be extracted or not as ({item, index}) => boolean 
     * @param {object} options : #props : "returnIndex" : extracted will contain objects {item, index} iso any item
     * @return {object} {extracted[items], filtered[]} where 'items' is either an object {item, index} if returnIndex option is set, or any item
     */
    extractItem : (array, extract, options) => new Promise(async(resolve) => {
        let extracted = [];
        const {returnIndex} = options || {}
            let _conditions = await Promise.resolve(
            array.map(async(item, index) => {
                let condition = await extract({item, index});	
                condition && await Promise.resolve(extracted.push(returnIndex ? {item, index} : item));
                return condition || false
            })
        )
        const conditions = await Promise.all(_conditions);

        let filtered = await Promise.resolve(
            array.filter((e, i) => !conditions[i])
        )

        resolve({extracted, filtered})
    }),

    /**
     * @dev define validity of an email
     * @param {String} email an email address to test
     * @returns {Boolean} indicating if 'email' is a valid email address
     */
    isValidEmail : async(email) => {
        const arobaseSplit = email.split('@')
        const validParts = await Promise.resolve(arobaseSplit.length === 2 && arobaseSplit[1].indexOf('.') > 1)
        const valid = validParts && await Promise.resolve(arobaseSplit[1].split('.')[1].length >= 2)
        return(valid)
    },

    /**
     * @param {String} name : any name
     * @return {String} initials from name ('Jean Dupont' => 'JD')
     */
    nameInitials : (name) => name ? name.split(' ').map((e) => e.charAt(0).toUpperCase()).join('') : '',

    /**
     * @param {object} object : source object data
     * @param {function} mapFn : a function called on each iteration, MUST return value ex. (value, key) => value.toLowerCase()
     * @param {object} options 
     *      @prop {boolean} options.avoidUnappreciateds : indicate if value must be added to the output if they have no/unappreciated value (such as null, undefined, 0)
     * @return {object} updated from condition defined in provided mapFn
     */
    objectMap : async(object, mapFn, options) => {
        const { avoidUnappreciateds } = options
        const keys = Object.keys(object)
        const mapping = await Promise.resolve(
            keys.reduce((result, key) => {
                
                // result[key] = mapFn(object[key], key)
                // return result

                let processedResult = mapFn(object[key], key)
                let upItem = {...result, [key]: processedResult}
                
                return (
                    avoidUnappreciateds
                    ? (
                        typeof processedResult !== 'undefined'
                        ? upItem
                        : result
                    )
                    : upItem
                )
            }, {})
        )
    
        return mapping
    },


    /**
     * 
     * @param {*} str 
     * @notice Will provide equivalent results as RN expo-crypto digestStringAsync method
     */
    hasher : (str) => {
        return new Promise((resolve) => {
            const hash = crypto.createHash('sha256');

            hash.on('readable', () => {
                const data = hash.read();
                if (data) {
                    //console.log(data.toString('hex'));
                    resolve(data.toString('hex'))
                }
            });

            hash.write(str);
            hash.end();
        })
    }
    
}

export default Utils