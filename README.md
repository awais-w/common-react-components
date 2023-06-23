Shared components for use by CMC ui projects.

We should prefer to use any bolt shared components before creating any in here.

# Testing

The usual test scripts exist such as `yarn test:unit` however to test the integration with CHA, it is advised to use npm/yarn linking and test in-situ.

A single changed component can be linked by running `yarn link` in the component directory and `yarn link $COMPONENT_NAME` in CHA.

## Linking all components into CHA

In this directory run `for i in src/components/*; do pushd $i; yarn link; popd; done`

In cha run `for i in $(jq -r .name ../common-react-components/src/components/*/package.json); do yarn link $i; done`

To unlink, run the same commands with unlink instead of link then run `yarn install --force` in cha-ui

If you can't run unit tests after linking, you can do this to remove the links: `pushd node_modules/@cmc/ > /dev/null; ls -l | grep -- '->' | while read -r line; do dir=$(echo $line|sed 's/.* \([a-zA-Z-]*\) -> .*/\1/'); src=$(echo $line|sed 's/.* -> \([a-zA-Z-]*\)/\1/'); rm "$dir" && cp -a "$(python -c 'import os,sys;print(os.path.realpath(sys.argv[1]))' ${src})" "$dir" && echo $dir; done; popd > /dev/null`
