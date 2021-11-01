async function openJson(path) {
    if ((typeof process !== 'undefined') && (process.release.name === 'node') ||
        // Node (>= 3.0.0) or io.js
        ((typeof process !== 'undefined') && (process.release.name.search(/node|io.js/) !== -1)) ||
        // Node (>= 0.10.0) or io.js
        ((typeof process !== 'undefined') && (typeof process.versions.node !== 'undefined'))) {

        return require(path)
    }
// Runs if the HTML window isn't given
    else if (typeof window === 'undefined') {
    } else {
        let data = await fetch(path).then(response => response.json()).catch(e => e);
        data = await fetch('http://localhost:63342/cards/src/themes/solitaire/index.json').then(response => response.json()).catch(e => e);
        return data;
    }
}

export default openJson