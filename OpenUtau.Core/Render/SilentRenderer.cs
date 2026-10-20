using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OpenUtau.Core.Ustx;

namespace OpenUtau.Core.Render {
    /// <summary>
    /// 静音渲染器：音频引擎（时间轴、混音、播放）照常运行，但每个乐句只产出等长的静音，
    /// 不做任何歌声合成。渲染器 id 沿用原有名称以兼容已保存的工程。
    /// </summary>
    public class SilentRenderer : IRenderer {
        const int SampleRate = 44100;
        readonly string id;

        public SilentRenderer(string id) {
            this.id = id;
        }

        public USingerType SingerType => USingerType.Classic;
        public bool SupportsRenderPitch => false;

        public bool SupportsExpression(UExpressionDescriptor descriptor) => true;

        public RenderResult Layout(RenderPhrase phrase) {
            return new RenderResult() {
                leadingMs = phrase.leadingMs,
                positionMs = phrase.positionMs,
                estimatedLengthMs = phrase.durationMs + phrase.leadingMs,
            };
        }

        public Task<RenderResult> Render(RenderPhrase phrase, Progress progress, int trackNo, CancellationTokenSource cancellation, bool isPreRender = false, RenderPhraseEvents? renderEvents = null) {
            return Task.Run(() => {
                var result = Layout(phrase);
                int count = (int)(result.estimatedLengthMs * SampleRate / 1000.0);
                result.samples = new float[count > 0 ? count : 0];
                progress.Complete(phrase.phones.Length, string.Empty);
                return result;
            });
        }

        public RenderPitchResult LoadRenderedPitch(RenderPhrase phrase) => null!;

        public UExpressionDescriptor[] GetSuggestedExpressions(USinger singer, URenderSettings renderSettings) {
            var manifest = renderSettings.Resampler?.Manifest;
            if (manifest == null) {
                return new UExpressionDescriptor[] { };
            }
            return System.Linq.Enumerable.ToArray(manifest.expressions.Values);
        }

        public override string ToString() => id;
    }
}
