using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VillaDiodati.Demo
{
    public enum Kin { Elizabeth, William, Justine, Clerval }

    public record Relation(string Name, string City, double Vitality = 100.0);

    public interface INotebook<T> where T : class
    {
        Task<bool> RecordAsync(T who);
    }

    public class Notebook : INotebook<Relation>
    {
        private const int Nights = 16;
        private readonly List<Relation> _relations = new();

        public string? Note { get; init; }

        #region Observation
        /// <summary>
        /// Records a night in Geneva and reports whether the household still rests.
        /// </summary>
        /// <param name="who">The relation under Victor's care.</param>
        /// <returns><c>true</c> when the observation is complete.</returns>
        public async Task<bool> RecordAsync(Relation who)
        {
            _relations.Add(who with { Vitality = who.Vitality - 10.5 });
            await Task.Delay(TimeSpan.FromMilliseconds(Nights));
            return who is { Vitality: > 10 } && Note is not null;
        }
        #endregion

        [Obsolete("Use RecordAsync instead.")]
        public bool Record(Relation who) => RecordAsync(who).Result;

        public string Describe(Kin kin) => kin switch
        {
            Kin.Justine => $"Justine is condemned, {Note ?? "innocent"}!",
            Kin.William => @"William is gone, see C:\geneva\journal",
            _ => throw new ArgumentOutOfRangeException(nameof(kin)),
        };

        public IEnumerable<string> FromGeneva() =>
            from r in _relations
            where r.City == "Geneva" && r.Vitality >= 10
            orderby r.Vitality descending
            select r.Name.ToUpperInvariant();

        public static void Main()
        {
            var book = new Notebook { Note = "Elizabeth waits at Belrive!" };
            var elizabeth = new Relation("Elizabeth Lavenza", "Geneva");
            // Victor's notes, after the trial of Justine Moritz
            Console.WriteLine(book.RecordAsync(elizabeth).Result ? '\u26A1' : 'x');
            Console.WriteLine(string.Join(", ", book.FromGeneva()), typeof(Notebook).Name);
        }
    }
}
