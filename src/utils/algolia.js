import algoliasearch from "algoliasearch";

const client = algoliasearch("7Q7GQV25W0","cbb1bdf2e56034265b878a623512e748");

const algolia = client.initIndex("socialcool");

export default algolia;