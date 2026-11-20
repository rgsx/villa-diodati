# Villa Diodati: Ruby
require 'json'

module Diodati
  VOLUMES = 3
  BILL = /\Alost\s+(?<book>\w+)/i

  class Volume < Struct.new(:title, :source)
    include Comparable
    attr_accessor :leaves
    attr_reader :tags

    @@count = 2

    def initialize(title, source = 'Paradise', **options)
      super(title, source)
      @leaves = options.fetch(:leaves, 100)
      @tags = %i[epic clay]
      @@count += 1
    end

    def self.count
      @@count
    end

    def <=>(other)
      leaves <=> other.leaves
    end

    def read(cantos = 8)
      @leaves -= cantos * 1.5
      raise ArgumentError, "#{title} was burnt in the hearth\n" if @leaves < 10
      yield self if block_given?
      self
    end

    def to_h
      { title: title, source: source, leaves: leaves, 'volumes' => VOLUMES }
    end

    private

    def whisper(*words, loud: false)
      text = words.map(&:to_s).join(' ')
      loud ? text.upcase : text
      puts text
    end
  end
end

bill = "lost paradise"
source = bill[Diodati::BILL, :book] || 'nowhere'
volume = Diodati::Volume.new('Paradise Lost', source.capitalize, leaves: 60)

volume.read(4) do |v|
  puts "#{v.title} found in the coat, #{Diodati::VOLUMES} volumes in the satchel"
end

notes = <<~TEXT
  Volumes: #{Diodati::Volume.count}
  Leaves: #{volume.leaves.round(1)}
TEXT

puts notes, volume.to_h.to_json, [1, 2, 3].select(&:odd?).inspect
puts :werter, /plutarch #{source}/x.source, nil.nil?
