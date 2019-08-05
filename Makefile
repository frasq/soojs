      COMPONENT = so-o-js
        VERSION = 1.0
       REVISION = 1

      SOO_FILES = So-o.js Root.js OL.js Once.js Application.js Responder.js
 
    POKER_FILES = Deck.js Hand.js Card.js
       POKER_JS = poker.js
 
      POKER_DIR = poker
   
   NODE_MODULES = node_modules
   
   LICENSE_FILE = LICENSE

      TAR_FILES = $(LICENSE_FILE) $(SOO_FILES) Makefile
      ZIP_FILES = $(TAR_FILES)
 
#.SILENT:

project:

$(NODE_MODULES):
	mkdir $@
	
setup:	$(NODE_MODULES)
	for f in $(SOO_FILES); do \
		ln -f $$f node_modules/`basename $$f .js`.mjs; \
	done
	if [ -d $(POKER_DIR) ]; then \
		ln -f $(POKER_DIR)/$(POKER_JS) `basename $(POKER_JS) .js`.mjs; \
		for f in $(POKER_FILES); do \
			ln -f $(POKER_DIR)/$$f $(NODE_MODULES)/`basename $$f .js`.mjs; \
		done \
	fi

clean:
	rm -r $(NODE_MODULES) *.mjs

wipe:	clean
	rm -f $(COMPONENT).tar.gz $(COMPONENT).zip

tar:
	tar -zcf $(COMPONENT).tar.gz $(TAR_FILES)

zip:
	zip $(COMPONENT).zip $(ZIP_FILES)
