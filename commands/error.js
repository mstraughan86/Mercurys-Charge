module.exports = function (param) {
	console.log("Invalid command entered: %s with arguments", param.args[0], param.args.slice(1));
};