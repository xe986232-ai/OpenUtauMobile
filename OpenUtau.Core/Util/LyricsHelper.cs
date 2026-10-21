using System;
using System.Collections.Generic;
using System.Linq;
using OpenUtau.Api;
using Pinyin;

namespace OpenUtau.Core.Util {
    public interface ILyricsHelper {
        string Source { get; }
        string Convert(string lyric);
    }

    public class ActiveLyricsHelper : SingletonBase<ActiveLyricsHelper> {
        public ILyricsHelper? Current { get; private set; }

        public ActiveLyricsHelper() {
            Set(GetPreferred());
        }

        public void Set(Type? t) {
            if (t == null || !Available.Contains(t)) {
                Current = null;
                return;
            }
            Current = Activator.CreateInstance(t) as ILyricsHelper;
        }

        public Type GetPreferred() {
            return Available.FirstOrDefault(
                avail => avail.Name == Preferences.Default.LyricHelper)
                ?? typeof(HiraganaLyricsHelper);
        }

        public readonly List<Type> Available = new List<Type>() {
            typeof(HiraganaLyricsHelper),
            typeof(PinyinLyricsHelper),
            typeof(JyutpingLyricsHelper),
        };
    }

    public class HiraganaLyricsHelper : ILyricsHelper {
        public string Source => "a->あ";
        public string Convert(string text) {
            return WanaKanaNet.WanaKana.ToHiragana(text);
        }
    }

    public class PinyinLyricsHelper : ILyricsHelper {
        public string Source => "汉->han";
        public string Convert(string lyric) {
            return Pinyin.Pinyin.Instance.GetDefaultPinyin(lyric, ManTone.Style.NORMAL, false, false).ToArray()[0];
        }
    }

    public class JyutpingLyricsHelper : ILyricsHelper {
        public string Source => "粤->jyut";
        public string Convert(string lyric) {
            return Pinyin.Jyutping.Instance.GetDefaultPinyin(lyric, CanTone.Style.NORMAL).ToArray()[0];
        }
    }
}

