const OS = require('sf-core/device/system').OS;
const buildExtender = require("sf-extension-utils/lib/router/buildExtender");
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");
require("sf-extension-utils/lib/router/goBack"); // Implements onBackButtonPressed
const router = Router.of({
    path: "/",
    to: "/pages",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            to: "/pages/bookshelf",
            routes: [
                Route.of({
                    path: "/pages/bookshelf",
                    build: buildExtender({ getPageClass: () => require("pages/bookshelf").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/bookdetails",
                    build: buildExtender({ getPageClass: () => require("pages/bookdetails").default, headerBarStyle: { visible: true } })
                }),
            ]
        })
    ]
});

export = router;
