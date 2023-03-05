export const deleteBrackets = (str: string): string => {
    return str.replace(/\(.+\)/,'');
}

export const formatStringToArray = (str: string): string[] => {
    return deleteBackSpaces(str.replace(/\(.+\)/,'')).split(",");
}

export const deleteBackSpaces = (str: string): string => {
    return str.replace(/ /g, "")
}

export const formatAnswerStr = (str: string): string => {
    return deleteBackSpaces(str.toLocaleLowerCase())
}