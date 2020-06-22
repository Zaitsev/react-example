import {CSSPlugin, CSSModulesPlugin,FuseBox, fusebox, SassPlugin, Sparky, WebIndexPlugin} from "fuse-box";

class Context {
    runServer;
    getConfig = () =>
        fusebox({
            target: "browser",
            entry: "src/index.tsx",
            webIndex: {
                template: "src/index.html"
            },
            cache : true,
            devServer: this.runServer
        });
}
// const { task } = Sparky<Context>(Context);

Sparky.task("default", async ctx => {
    const moduleStyles=[
        /^((?!global).)*scss$/,
        SassPlugin(), CSSModulesPlugin(), CSSPlugin()
    ];
    const appStyles=[
        /global\.scss$/,
        SassPlugin(), CSSPlugin()
    ];
    const fuse = FuseBox.init({
        target: "browser",
        homeDir                     : 'src',
        allowSyntheticDefaultImports: true,
        // alias: {'@':`./${OUTPUT_DIR}`},
        output                      : `dist/renderer/$name.js`,
        // entry: "src/index.tsx",
        plugins:[
            appStyles,
            moduleStyles,
            WebIndexPlugin({
                template: "src/index.html"
            })
        ],

        // cache : true,
        // devServer: this.runServer
    });
    await fuse.dev();
    const app = fuse.bundle('app')
        .instructions('>index.tsx + fuse-box-css')
    ;
    app
        .hmr()
        .watch();
    return fuse.run();
});

Sparky.task("preview", async ctx => {
    ctx.runServer = true;
    const fuse = ctx.getConfig();
    await fuse.runProd({ uglify: false });
});
Sparky.task("dist", async ctx => {
    ctx.runServer = false;
    const fuse = ctx.getConfig();
    await fuse.runProd({ uglify: false });
});