using System.Collections.Generic;
using OpenUtau.Classic;
using OpenUtau.Core.Analysis;
using OpenUtau.Core.Render;
using OpenUtau.Core.Ustx;

namespace OpenUtau.Core {
    /// <summary>The registry packages OpenUtau's engines need, and which the app may install itself.</summary>
    public static class PackageRequirements {
        public static readonly IReadOnlySet<string> Installable = new HashSet<string> {
            Hnsep.PackageId,
            "game",
            "rmvpe",
        };

        /// <summary>合成已移除，任何渲染器都不再需要额外的模型包。</summary>
        public static string[] For(URenderSettings settings) => [];
    }
}
