var assert 	= require('chai').assert,
	path 	= require('path');

describe('Config util library tests', function () {

	var testConfig = require('../test-helper'),
		configUtil;


	before(function () {
		configUtil = require(path.resolve(testConfig.project_root, 'util/config'));
	});

	it('should test config properties passed to config.init', function () {
		configUtil.init({
			a: 'A',
			b: 'B',
			BOT_NAME: ['bot']
		});

		assert.equal(configUtil.get('a'), 'A');
		assert.equal(configUtil.get('b'), 'B');
	});

	it('should test config_dir, command_dir, space_replacement and error_command properties passed to config.init', function () {
		configUtil.init({
			COMMAND_DIR : path.resolve(testConfig.test_root, 'commands'),
			CONFIG_DIR 	: path.resolve(testConfig.test_root, 'config'),
			ERROR_COMMAND: 'test-error',
			SPACE_REPLACEMENT: '#SPACE#',
			BOT_NAME: ['Bot', 'Robot']
		});

		assert.equal(configUtil.get('COMMAND_DIR'), path.resolve(testConfig.test_root, 'commands'));
		assert.equal(configUtil.get('CONFIG_DIR'), path.resolve(testConfig.test_root, 'config'));
		assert.equal(configUtil.get('ERROR_COMMAND'), 'test-error');
		assert.equal(configUtil.get('SPACE_REPLACEMENT'), '#SPACE#');
		assert.deepEqual(configUtil.get('BOT_NAME'), ['BOT', 'ROBOT']);
	});

	it('should test default config_dir, command_dir, space_replacement and error_command, when not provided with config.init', function () {
		configUtil.init({BOT_NAME: ["Bot"]});

		assert.equal(configUtil.get('CONFIG_DIR'), path.resolve(testConfig.project_root, '../../config'));
		assert.equal(configUtil.get('COMMAND_DIR'), path.resolve(testConfig.project_root, '../../commands'));
		assert.equal(configUtil.get('ERROR_COMMAND'), 'error');
		assert.equal(configUtil.get('SPACE_REPLACEMENT'), '{SPACE}');
	});


	it('should error when no bot name configure', function () {

		try {
			configUtil.init();
			assert.fail();
		} catch (e) {
			assert.equal(e.message, "Bot name is required.");
		}
	});

});
