import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
   allowlist: {
      "node_modules/@parcel/watcher@2.5.1": "ALLOW",
      "node_modules/dtrace-provider@0.8.8": "ALLOW",
      "node_modules/edgedriver@6.1.1": "FORBID",
      "node_modules/esbuild@0.25.5": "ALLOW",
      "node_modules/fsevents@2.3.3": "ALLOW",
      "node_modules/geckodriver@5.0.0": "FORBID"
   },
})
