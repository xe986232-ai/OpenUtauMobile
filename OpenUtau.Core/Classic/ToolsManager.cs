using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using OpenUtau.Core;
using OpenUtau.Core.Util;
using Serilog;

namespace OpenUtau.Classic {
    public class ToolsManager : SingletonBase<ToolsManager> {
        static object _locker = new object();

        private readonly List<IResampler> resamplers = new List<IResampler>();
        private readonly List<IWavtool> wavtools = new List<IWavtool>();
        private readonly Dictionary<string, IResampler> resamplersMap
            = new Dictionary<string, IResampler>();
        private readonly Dictionary<string, IWavtool> wavtoolsMap
            = new Dictionary<string, IWavtool>();

        public List<IResampler> Resamplers {
            get {
                lock (_locker) {
                    return resamplers.ToList();
                }
            }
        }

        public List<IWavtool> Wavtools {
            get {
                lock (_locker) {
                    return wavtools.ToList();
                }
            }
        }

        public void Initialize() {
            lock (_locker) {
                SearchResamplers();
                SearchWavtools();
            }
        }

        public void SearchResamplers() {
            resamplers.Clear();
            resamplersMap.Clear();
            resamplers.Add(new SilentResampler());
            foreach (var resampler in resamplers) {
                resamplersMap[resampler.ToString()] = resampler;
            }
        }

        public void SearchWavtools() {
            wavtools.Clear();
            wavtoolsMap.Clear();
            wavtools.Add(new SilentWavtool(true));
            wavtools.Add(new SilentWavtool(false));
            foreach (var wavtool in wavtools) {
                wavtoolsMap[wavtool.ToString()] = wavtool;
            }
        }

        public IResampler GetResampler(string name) {
            lock (_locker) {
                if (name != null && resamplersMap.TryGetValue(name, out var resampler)) {
                    return resampler;
                } else {
                    return resamplersMap[SilentResampler.name];
                }
            }
        }

        public IWavtool GetWavtool(string name) {
            lock (_locker) {
                if (name != null && wavtoolsMap.TryGetValue(name, out var wavtool)) {
                    return wavtool;
                } else {
                    return wavtoolsMap[SilentWavtool.nameConvergence];
                }
            }
        }
    }
}
