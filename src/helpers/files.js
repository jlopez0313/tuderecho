export const splitFileName = (fileName) => {
    const ext = /(?:\.([^.]+))?$/.exec(fileName);
    if (ext[1] === undefined) return [fileName, ''];
    const name = fileName.slice(0, -ext[0].length);
    return [name, ext[1]]
}