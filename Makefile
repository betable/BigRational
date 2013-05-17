all: test

test:
	NODE_ENV=test node_modules/mocha/bin/mocha --reporter spec test/$(file)

test-cov:
	NODE_ENV=test node node_modules/istanbul/lib/cli.js --print=detail cover \
		node_modules/mocha/bin/_mocha -- --reporter min test/$(file)

test-cov-html:
	NODE_ENV=test node node_modules/istanbul/lib/cli.js --print=summary cover \
		node_modules/mocha/bin/_mocha -- --reporter min test/$(file)

	@echo ""
	@echo "****************************************************************************************"
	@echo "Results: file://$$PWD/coverage/lcov-report/index.html"
	@echo "****************************************************************************************"

jenkins:
	NODE_ENV=test node node_modules/istanbul/lib/cli.js --print=none --report=cobertura cover \
		node_modules/mocha/bin/_mocha -- --reporter xunit-file test/$(file)

ifneq ($(WORKSPACE), )
	sed -i -e 's|$(WORKSPACE)/||g' coverage/cobertura-coverage.xml
endif

	# Need a way to mark a build as unstable so we can have higher limits
	# http://stackoverflow.com/questions/8148122/how-to-mark-a-build-unstable-in-jenkins-when-running-shell-scripts

	node node_modules/istanbul/lib/cli.js check-coverage \
		--statements=45 --branches=35 --functions=35 --lines=45

.PHONY: all test test-cov test-cov-html jenkins
