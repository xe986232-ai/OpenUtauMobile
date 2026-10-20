using System.Collections.Generic;
using System.Threading;
using OpenUtau.Core.Ustx;
using Serilog;

namespace OpenUtau.Classic {
    /// <summary>
    /// 静音 resampler：保留 UTrack/URenderSettings 依赖的 IResampler 接口与表达式清单，
    /// 但不做任何合成。名称沿用 "worldline" 以兼容已保存的工程。
    /// </summary>
    public class SilentResampler : IResampler {
        public const string name = "worldline";
        public string FilePath => string.Empty;
        public bool NoWrapperScript => true;

        public float[] DoResampler(ResamplerItem args, ILogger logger) => new float[0];
        public string DoResamplerReturnsFile(ResamplerItem args, ILogger logger) => string.Empty;
        public void CheckPermissions() { }

        public ResamplerManifest Manifest { get; } = new ResamplerManifest() {
            expressions = new Dictionary<string, UExpressionDescriptor> {
                { "ten", new UExpressionDescriptor("tension","ten",-100,100,0,"Mt") },
                { "brea", new UExpressionDescriptor("breathiness","brea",-100,100,0,"Mb") },
                { "voi", new UExpressionDescriptor("voicing","voi",0,100,100,"Mv") }
            },
            expressionFilter = false
        };

        public bool SupportsFlag(string abbr) => false;
        public override string ToString() => name;
    }

    /// <summary>静音 wavtool：保留 IWavtool 接口与名称，不做拼接。</summary>
    public class SilentWavtool : IWavtool {
        public const string nameConvergence = "convergence";
        public const string nameSimple = "simple";
        readonly bool phaseComp;

        public SilentWavtool(bool phaseComp) {
            this.phaseComp = phaseComp;
        }

        public float[] Concatenate(List<ResamplerItem> resamplerItems, string tempPath, CancellationTokenSource cancellation) => new float[0];
        public void CheckPermissions() { }
        public override string ToString() => phaseComp ? nameConvergence : nameSimple;
    }
}
