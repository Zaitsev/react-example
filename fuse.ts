import {fusebox, pluginSass, sparky} from "fuse-box";

class Context {
    runServer;
    getConfig = () =>
        fusebox({
            target: "electron",
            entry: "src/index.tsx",
            sourceMap:false,
            plugins: [
                pluginSass('*.scss', {
                    asModule: { scopeBehaviour: 'local' },
                })
            ],
            webIndex: {
                template: "src/index.html"
            },
            cache: true,
            devServer: this.runServer
        });
}

const {task} = sparky<Context>(Context);

task("default", async ctx => {
    ctx.runServer = true;
    const fuse = ctx.getConfig();
    await fuse.runDev();
});

task("preview", async ctx => {
    ctx.runServer = true;
    const fuse = ctx.getConfig();
    await fuse.runProd({uglify: false});
});
task("dist", async ctx => {
    ctx.runServer = false;
    const fuse = ctx.getConfig();
    await fuse.runProd({uglify: false});
});
