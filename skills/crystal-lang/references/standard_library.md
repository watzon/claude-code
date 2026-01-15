# Crystal-Lang - Standard Library

**Pages:** 265

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/XML.html

**Contents:**
- module XML
- Overview
  - Parsing
- Generating
- Defined in:
- Class Method Summary
- Class Method Detail

The XML module allows parsing and generating XML documents.

NOTE To use XML, you must explicitly import it with require "xml"

XML#parse will parse xml from String or IO and return xml document as an XML::Node which represents all kinds of xml nodes.

Use XML.build, which uses an XML::Builder:

Returns the resulting String of writing XML to the yielded XML::Builder.

Writes XML document into the given IO.

Writes XML fragment into the given IO.

Returns the resulting String of writing XML to the yielded XML::Builder.

Parses an XML document from string with options into an XML::Node.

Parses an XML document from io with options into an XML::Node.

Parses an HTML document from string with options into an XML::Node.

Parses an HTML document from io with options into an XML::Node.

Returns the resulting String of writing XML to the yielded XML::Builder.

Builds an XML document (see #document) including XML declaration (<?xml?>).

Writes XML document into the given IO. An XML::Builder is yielded to the block.

Builds an XML document (see #document) including XML declaration (<?xml?>).

Writes XML fragment into the given IO. An XML::Builder is yielded to the block.

Builds an XML fragment without XML declaration (<?xml?>).

Returns the resulting String of writing XML to the yielded XML::Builder.

Builds an XML fragment without XML declaration (<?xml?>).

Parses an XML document from string with options into an XML::Node.

See ParserOptions.default for default options.

Parses an XML document from io with options into an XML::Node.

See ParserOptions.default for default options.

Parses an HTML document from string with options into an XML::Node.

See HTMLParserOptions.default for default options.

Parses an HTML document from io with options into an XML::Node.

See HTMLParserOptions.default for default options.

**Examples:**

Example 1 (jsx):
```jsx
require "xml"

xml = <<-XML
 <person id="1">
  <firstname>Jane</firstname>
  <lastname>Doe</lastname>
 </person>
XML

document = XML.parse(xml)             # : XML::Node
person = document.first_element_child # : XML::Node?
if person
  puts person["id"] # "1" : String?

  puts typeof(person.children)                       # XML::NodeSet
  person.children.select(&.element?).each do |child| # Select only element children
    puts typeof(child)                               # XML::Node
    puts child.name                                  # firstname : String
    puts child.content                               # Jane : String?
  end
end
```

Example 2 (xml):
```xml
require "xml"

string = XML.build(indent: "  ") do |xml|
  xml.element("person", id: 1) do
    xml.element("firstname") { xml.text "Jane" }
    xml.element("lastname") { xml.text "Doe" }
  end
end

string # => "<?xml version=\"1.0\"?>\n<person id=\"1\">\n  <firstname>Jane</firstname>\n  <lastname>Doe</lastname>\n</person>\n"
```

Example 3 (xml):
```xml
require "xml"

string = XML.build(indent: "  ") do |xml|
  xml.element("person", id: 1) do
    xml.element("firstname") { xml.text "Jane" }
    xml.element("lastname") { xml.text "Doe" }
  end
end

string # => "<?xml version=\"1.0\"?>\n<person id=\"1\">\n  <firstname>Jane</firstname>\n  <lastname>Doe</lastname>\n</person>\n"
```

Example 4 (jsx):
```jsx
require "xml"

string = XML.build_fragment(indent: "  ") do |xml|
  xml.element("person", id: 1) do
    xml.element("firstname") { xml.text "Jane" }
    xml.element("lastname") { xml.text "Doe" }
  end
end

string # => "<person id=\"1\">\n  <firstname>Jane</firstname>\n  <lastname>Doe</lastname>\n</person>\n"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Union.html

**Contents:**
- struct Union(*T)
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

A union type represents the possibility of a variable or an expression having more than one possible type at compile time.

When invoking a method on a union type, the language checks that the method exists and can be resolved (typed) for each type in the union. For this reason, adding instance methods to Union makes no sense and has no effect. However, adding class method to Union is possible and can be useful. One example is parsing JSON into one of many possible types.

Union is special in that it is a generic type but instantiating it might not return a union type:

**Examples:**

Example 1 (javascript):
```javascript
Union(Int32 | String)      # => (Int32 | String)
Union(Int32)               # => Int32
Union(Int32, Int32, Int32) # => Int32
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/GC/Stats.html

**Contents:**
- struct GC::Stats
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Total memory allocated by the GC into its HEAP since the last GC collection, in bytes.

Approximate number of free bytes in the GC HEAP.

The system memory allocated by the GC for its HEAP, in bytes.

Total memory allocated by the GC into its HEAP since the program started, in bytes.

The size (in bytes) of virtual system memory that the GC returned to the OS when shrinking its HEAP.

Total memory allocated by the GC into its HEAP since the last GC collection, in bytes.

Approximate number of free bytes in the GC HEAP. The number is relative to the #heap_size. The reported value is pessimistic, there might be more free bytes in reality.

The system memory allocated by the GC for its HEAP, in bytes. The memory may or may not have been allocated by the OS (for example some pages haven't been accessed). The number can grow and shrink as needed by the process.

Total memory allocated by the GC into its HEAP since the program started, in bytes. The number keeps growing indefinitely until the integer wraps back to zero.

The size (in bytes) of virtual system memory that the GC returned to the OS when shrinking its HEAP. The OS may have reclaimed the memory already, reducing the resident memory usage, or may do so later (for example on memory pressure). The GC will reuse this memory when it needs to grow its HEAP again.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/index.html

**Contents:**
- Crystal
- Why?
- Project Status
- Installing
- Try it online
- Documentation
- Community
- Contributing

Crystal is a programming language with the following goals:

We love Ruby's efficiency for writing code.

We love C's efficiency for running code.

We want the best of both worlds.

We want the compiler to understand what we mean without having to specify types everywhere.

Oh, and we don't want to write C code to make the code run faster.

Within a major version, language features won't be removed or changed in any way that could prevent a Crystal program written with that version from compiling and working. The built-in standard library might be enriched, but it will always be done with backwards compatibility in mind.

Development of the Crystal language is possible thanks to the community's effort and the continued support of 84codes and every other sponsor.

Follow these installation instructions

play.crystal-lang.org

Have any questions or suggestions? Ask on the Crystal Forum, on our Gitter channel or IRC channel #crystal-lang at irc.libera.chat, or on Stack Overflow under the crystal-lang tag. There is also an archived Google Group.

The Crystal repository is hosted at crystal-lang/crystal on GitHub.

Read the general Contributing guide, and then:

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OpenSSL/SSL/Context.html

**Contents:**
- abstract class OpenSSL::SSL::Context
- Overview
- Direct Known Subclasses
- Defined in:
- Constant Summary
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

An SSL::Context represents a generic secure socket protocol configuration.

For both server and client applications exist more specialized subclassses SSL::Context::Server and SSL::Context::Client which need to be instantiated appropriately.

The list of secure ciphersuites on intermediate compatibility level as per Mozilla recommendations.

The oldest clients supported by this configuration are:

This list represents version 5.7 of the intermediate configuration available at https://ssl-config.mozilla.org/guidelines/5.7.json.

See https://wiki.mozilla.org/Security/Server_Side_TLS for details.

DEPRECATED Deprecated with no replacement. Prefer setting a security level, global system configuration, or build your own from https://ssl-config.mozilla.org

The list of secure ciphersuites on modern compatibility level as per Mozilla recommendations.

The oldest clients supported by this configuration are:

This list represents version 5.7 of the modern configuration available at https://ssl-config.mozilla.org/guidelines/5.7.json.

See https://wiki.mozilla.org/Security/Server_Side_TLS for details.

DEPRECATED Deprecated with no replacement. Prefer setting a security level, global system configuration, or build your own from https://ssl-config.mozilla.org

The list of secure ciphersuites on old compatibility level as per Mozilla recommendations.

The oldest clients supported by this configuration are:

This list represents version 5.7 of the old configuration available at https://ssl-config.mozilla.org/guidelines/5.7.json.

See https://wiki.mozilla.org/Security/Server_Side_TLS for details.

DEPRECATED Deprecated with no replacement. Prefer setting a security level, global system configuration, or build your own from https://ssl-config.mozilla.org

The list of secure ciphers on intermediate compatibility level as per Mozilla recommendations.

The oldest clients supported by this configuration are:

This list represents version 5.7 of the intermediate configuration available at https://ssl-config.mozilla.org/guidelines/5.7.json.

See https://wiki.mozilla.org/Security/Server_Side_TLS for details.

DEPRECATED Deprecated with no replacement. Prefer setting a security level, global system configuration, or build your own from https://ssl-config.mozilla.org

The list of secure ciphers on modern compatibility level as per Mozilla recommendations.

The oldest clients supported by this configuration are:

This list represents version 5.7 of the modern configuration available at https://ssl-config.mozilla.org/guidelines/5.7.json.

See https://wiki.mozilla.org/Security/Server_Side_TLS for details.

DEPRECATED Deprecated with no replacement. Prefer setting a security level, global system configuration, or build your own from https://ssl-config.mozilla.org

The list of secure ciphers on old compatibility level as per Mozilla recommendations.

The oldest clients supported by this configuration are:

This list represents version 5.7 of the old configuration available at https://ssl-config.mozilla.org/guidelines/5.7.json.

See https://wiki.mozilla.org/Security/Server_Side_TLS for details.

DEPRECATED Deprecated with no replacement. Prefer setting a security level, global system configuration, or build your own from https://ssl-config.mozilla.org

Adds modes to the TLS context.

Adds options to the TLS context.

Sets the given OpenSSL::SSL::X509VerifyFlags in this context, additionally to the already set ones.

Specifies an ALPN protocol to negotiate with the remote endpoint.

Sets the path to a file containing all CA certificates, in PEM format, used to validate the peers certificate.

Sets the path to a directory containing all CA certificates used to validate the peers certificate.

Specify the path to the certificate chain file to use.

Specify a list of TLS ciphersuites to use or discard for TLSv1.3.

Specify a list of TLS ciphers to use or discard for TLSv1.2 and below.

Sets this context verify param to the default one of the given name.

Returns the current modes set on the TLS context.

Returns the current options set on the TLS context.

Specify the path to the private key to use.

Removes modes from the TLS context.

Removes options from the TLS context.

Returns the security level used by this TLS context.

Sets the security level used by this TLS context.

Sets the default paths for #ca_certificates= and #ca_certificates_path=.

Sets the current ciphers and ciphers suites to intermediate compatibility level as per Mozilla recommendations.

DEPRECATED Deprecated with no replacement. Prefer #security_level, global system configuration or build your own from https://wiki.mozilla.org/Security/Server_Side_TLS

Sets the current ciphers and ciphers suites to modern compatibility level as per Mozilla recommendations.

DEPRECATED Deprecated with no replacement. Prefer #security_level, global system configuration or build your own from https://wiki.mozilla.org/Security/Server_Side_TLS

Sets the current ciphers and ciphers suites to old compatibility level as per Mozilla recommendations.

DEPRECATED Deprecated with no replacement. Prefer #security_level, global system configuration or build your own from https://wiki.mozilla.org/Security/Server_Side_TLS

Adds a temporary ECDH key curve to the TLS context.

Returns the current verify mode.

Sets the verify mode.

Adds modes to the TLS context.

Adds options to the TLS context.

Sets the given OpenSSL::SSL::X509VerifyFlags in this context, additionally to the already set ones.

Specifies an ALPN protocol to negotiate with the remote endpoint. This is required to negotiate HTTP/2 with browsers, since browser vendors decided not to implement HTTP/2 over insecure connections.

Sets the path to a file containing all CA certificates, in PEM format, used to validate the peers certificate.

Sets the path to a directory containing all CA certificates used to validate the peers certificate. The certificates should be in PEM format and the c_rehash(1) utility must have been run in the directory.

Specify the path to the certificate chain file to use. In server mode this is presented to the client, in client mode this used as client certificate.

Specify a list of TLS ciphersuites to use or discard for TLSv1.3.

See #security_level= for some sensible system configuration.

NOTE The ciphersuites available to an application are determined by the linked version of the system SSL library. A comprehensive list of ciphersuites can be found in the OpenSSL Cipher documentation.

Specify a list of TLS ciphers to use or discard for TLSv1.2 and below.

See #security_level= for some sensible system configuration.

This method does not impact TLSv1.3 ciphersuites. Use #cipher_suites= to configure those.

NOTE The ciphers available to an application are determined by the linked version of the system SSL library. A comprehensive list of ciphers can be found in the OpenSSL Cipher documentation.

Sets this context verify param to the default one of the given name.

Depending on the OpenSSL version, the available defaults are default, pkcs7, smime_sign, ssl_client and ssl_server.

Returns the current modes set on the TLS context.

Returns the current options set on the TLS context.

Specify the path to the private key to use. The key must in PEM format. The key must correspond to the entity certificate set by #certificate_chain=.

Removes modes from the TLS context.

Removes options from the TLS context.

Returns the security level used by this TLS context.

Sets the security level used by this TLS context. The default system security level might disable some ciphers.

Sets the default paths for #ca_certificates= and #ca_certificates_path=.

Sets the current ciphers and ciphers suites to intermediate compatibility level as per Mozilla recommendations. See #security_level= for some sensible system configuration.

WARNING Does nothing as of Crystal 1.13.

WARNING Didn't work as expected as of OpenSSL 1.1 (didn't configure TLSv1.2 and below).

DEPRECATED Deprecated with no replacement. Prefer #security_level, global system configuration or build your own from https://wiki.mozilla.org/Security/Server_Side_TLS

Sets the current ciphers and ciphers suites to modern compatibility level as per Mozilla recommendations. See #security_level= for some sensible system configuration.

WARNING Does nothing as of Crystal 1.13.

WARNING Didn't work as expected as of OpenSSL 1.1 (didn't configure TLSv1.2 and below).

DEPRECATED Deprecated with no replacement. Prefer #security_level, global system configuration or build your own from https://wiki.mozilla.org/Security/Server_Side_TLS

Sets the current ciphers and ciphers suites to old compatibility level as per Mozilla recommendations. See #security_level= for some sensible system configuration.

WARNING Does nothing as of Crystal 1.13.

WARNING Didn't work as expected as of OpenSSL 1.1 (didn't configure TLSv1.2 and below).

DEPRECATED Deprecated with no replacement. Prefer #security_level, global system configuration or build your own from https://wiki.mozilla.org/Security/Server_Side_TLS

Adds a temporary ECDH key curve to the TLS context. This is required to enable the EECDH cipher suites. By default the prime256 curve will be used.

Returns the current verify mode. See the SSL_CTX_set_verify(3) manpage for more details.

Sets the verify mode. See the SSL_CTX_set_verify(3) manpage for more details.

**Examples:**

Example 1 (julia):
```julia
context.add_options(
  OpenSSL::SSL::Options::ALL |       # various workarounds
  OpenSSL::SSL::Options::NO_SSL_V2 | # disable overly deprecated SSLv2
  OpenSSL::SSL::Options::NO_SSL_V3   # disable deprecated SSLv3
)
```

Example 2 (unknown):
```unknown
context.alpn_protocol = "h2"
```

Example 3 (julia):
```julia
context.remove_options(OpenSSL::SSL::Options::NO_SSL_V3)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Deflate/Reader.html

**Contents:**
- class Compress::Deflate::Reader
- Overview
- Included Modules
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module IO::Buffered
  - Instance methods inherited from class IO
  - Class methods inherited from class IO

A read-only IO object to decompress data in the DEFLATE format.

Instances of this class wrap another IO object. When you read from this instance instance, it reads data from the underlying IO, decompresses it, and returns it to the caller.

Creates an instance of Flate::Reader for the gzip format.

Creates an instance of Flate::Reader.

Creates an instance of Flate::Reader for the gzip format, yields it to the given block, and closes it at its end.

Creates a new reader from the given io, yields it to the given block, and closes it at its end.

Returns true if this reader is closed.

Dictionary passed in the constructor

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

If #sync_close? is true, closing this IO will close the underlying IO.

If #sync_close? is true, closing this IO will close the underlying IO.

Flushes the wrapped IO.

Rewinds the wrapped IO.

Always raises IO::Error because this is a read-only IO.

Creates an instance of Flate::Reader for the gzip format. has written.

Creates an instance of Flate::Reader.

Creates an instance of Flate::Reader for the gzip format, yields it to the given block, and closes it at its end.

Creates a new reader from the given io, yields it to the given block, and closes it at its end.

Returns true if this reader is closed.

Dictionary passed in the constructor

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

If #sync_close? is true, closing this IO will close the underlying IO.

If #sync_close? is true, closing this IO will close the underlying IO.

Flushes the wrapped IO.

TODO Add return type restriction Nil

Rewinds the wrapped IO.

TODO Add return type restriction Nil

Always raises IO::Error because this is a read-only IO.

**Examples:**

Example 1 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).inspect # => #<Person:0x10fd31f20 @name="John", @age=32>
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Random/ISAAC.html

**Contents:**
- class Random::ISAAC
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Random
  - Constructor methods inherited from module Random
  - Class methods inherited from module Random
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference

Generates a random unsigned integer.

Generates a random unsigned integer.

The integers must be uniformly distributed between 0 and the maximal value for the chosen type.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Void.html

**Contents:**
- struct Void
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Similar in usage to Nil. Void is preferred for C lib bindings.

NOTE This is a pseudo-class provided directly by the Crystal compiler. It cannot be reopened nor overridden.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/XML/Reader.html

**Contents:**
- class XML::Reader
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

XML::Reader is a parser for XML that iterates a XML document.

This is an alternative approach to XML.parse which parses an entire document into an XML data structure. XML::Reader offers more control and does not need to store the XML document in memory entirely. The latter is especially useful for large documents with the IO-based constructor.

WARNING This type is not concurrency-safe.

Creates a new reader from a string.

Creates a new reader from an IO.

Gets the attribute content for the attribute given by name.

Gets the attribute content for the attribute given by name.

Returns attribute count of the node.

Returns the current nesting depth of the reader.

Checks if the node is an empty element.

Returns the errors reported while parsing.

Expands the node to a XML::Node that can be searched with XPath etc.

Expands the node to a XML::Node that can be searched with XPath etc.

Checks if the node has any attributes.

Moves to the XML::Reader::Type::ATTRIBUTE with the specified name.

Moves from the XML::Reader::Type::ATTRIBUTE to its containing XML::Reader::Type::ELEMENT.

Moves to the first XML::Reader::Type::ATTRIBUTE of the node.

Moves to the next XML::Reader::Type::ATTRIBUTE of the node.

Returns the name of the node.

Moves the reader to the next node while skipping subtrees.

Moves the reader to the next sibling node while skipping subtrees.

Returns the XML::Reader::Type of the node.

Moves the reader to the next node.

Returns the node's XML content including subtrees.

Returns the XML for the node and its content including subtrees.

Returns the text content of the node.

Creates a new reader from a string.

See XML::ParserOptions.default for default options.

Creates a new reader from an IO.

See XML::ParserOptions.default for default options.

Gets the attribute content for the attribute given by name. Raises KeyError if attribute is not found.

Gets the attribute content for the attribute given by name. Returns nil if attribute is not found.

Returns attribute count of the node.

Returns the current nesting depth of the reader.

Checks if the node is an empty element.

Returns the errors reported while parsing.

Expands the node to a XML::Node that can be searched with XPath etc. The returned XML::Node is only valid until the next call to #read.

Raises a XML::Error if the node could not be expanded.

Expands the node to a XML::Node that can be searched with XPath etc. The returned XML::Node is only valid until the next call to #read.

Returns nil if the node could not be expanded.

Checks if the node has any attributes.

Moves to the XML::Reader::Type::ATTRIBUTE with the specified name.

Moves from the XML::Reader::Type::ATTRIBUTE to its containing XML::Reader::Type::ELEMENT.

Moves to the first XML::Reader::Type::ATTRIBUTE of the node.

Moves to the next XML::Reader::Type::ATTRIBUTE of the node.

Returns the name of the node.

Moves the reader to the next node while skipping subtrees.

Moves the reader to the next sibling node while skipping subtrees.

Returns the XML::Reader::Type of the node.

Moves the reader to the next node.

Returns the node's XML content including subtrees.

Returns the XML for the node and its content including subtrees.

Returns the text content of the node.

**Examples:**

Example 1 (r):
```r
require "xml"

reader = XML::Reader.new(<<-XML)
  <message>Hello XML!</message>
  XML
reader.read
reader.name # => "message"
reader.read
reader.value # => "Hello XML!"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/MIME/Multipart.html

**Contents:**
- module MIME::Multipart
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

The MIME::Multipart module contains utilities for parsing MIME multipart messages, which contain multiple body parts, each containing a header section and binary body. The multipart/form-data content-type has a separate set of utilities in the HTTP::FormData module.

Yields a Multipart::Builder to the given block, writing to io and using boundary.

Yields a Multipart::Builder to the given block, returning the generated message as a String.

Returns a unique string suitable for use as a multipart boundary.

Parses a MIME multipart message, yielding HTTP::Headers and an IO for each body part.

Parses a MIME multipart message, yielding HTTP::Headers and an IO for each body part.

Parses a MIME multipart message, yielding HTTP::Headers and an IO for each body part.

Extracts the multipart boundary from the Content-Type header.

Yields a Multipart::Builder to the given block, writing to io and using boundary. #finish is automatically called on the builder.

Yields a Multipart::Builder to the given block, returning the generated message as a String.

Returns a unique string suitable for use as a multipart boundary.

Parses a MIME multipart message, yielding HTTP::Headers and an IO for each body part.

Please note that the IO object yielded to the block is only valid while the block is executing. The IO is closed as soon as the supplied block returns.

See: Multipart::Parser

Parses a MIME multipart message, yielding HTTP::Headers and an IO for each body part.

Please note that the IO object yielded to the block is only valid while the block is executing. The IO is closed as soon as the supplied block returns.

See: Multipart::Parser

Parses a MIME multipart message, yielding HTTP::Headers and an IO for each body part.

Please note that the IO object yielded to the block is only valid while the block is executing. The IO is closed as soon as the supplied block returns.

See: Multipart::Parser

Extracts the multipart boundary from the Content-Type header. May return nil is the boundary was not found.

**Examples:**

Example 1 (yaml):
```yaml
require "mime/multipart"

MIME::Multipart.generate_boundary # => "---------------------------dQu6bXHYb4m5zrRC3xPTGwV"
```

Example 2 (julia):
```julia
require "mime/multipart"

multipart = "--aA40\r\nContent-Type: text/plain\r\n\r\nbody\r\n--aA40--"
MIME::Multipart.parse(IO::Memory.new(multipart), "aA40") do |headers, io|
  headers["Content-Type"] # => "text/plain"
  io.gets_to_end          # => "body"
end
```

Example 3 (yaml):
```yaml
require "http"
require "mime/multipart"

headers = HTTP::Headers{"Content-Type" => "multipart/mixed; boundary=aA40"}
body = "--aA40\r\nContent-Type: text/plain\r\n\r\nbody\r\n--aA40--"
request = HTTP::Request.new("POST", "/", headers, body)

MIME::Multipart.parse(request) do |headers, io|
  headers["Content-Type"] # => "text/plain"
  io.gets_to_end          # => "body"
end
```

Example 4 (yaml):
```yaml
require "http"
require "mime/multipart"

headers = HTTP::Headers{"Content-Type" => "multipart/byteranges; boundary=aA40"}
body = "--aA40\r\nContent-Type: text/plain\r\n\r\nbody\r\n--aA40--"
response = HTTP::Client::Response.new(
  status: :ok,
  headers: headers,
  body: body,
)

MIME::Multipart.parse(response) do |headers, io|
  headers["Content-Type"] # => "text/plain"
  io.gets_to_end          # => "body"
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Float.html

**Contents:**
- abstract struct Float
- Overview
- Included Modules
- Direct Known Subclasses
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Comparable(BigDecimal)
  - Instance methods inherited from module Comparable(BigRational)
  - Instance methods inherited from module Comparable(BigInt)

Float is the base type of all floating point numbers.

There are two floating point types, Float32 and Float64, which correspond to the binary32 and binary64 types defined by IEEE.

A floating point literal is an optional + or #- sign, followed by a sequence of numbers or underscores, followed by a dot, followed by numbers or underscores, followed by an optional exponent suffix, followed by an optional type suffix. If no suffix is present, the literal's type is Float64.

The underscore _ before the suffix is optional.

Underscores can be used to make some numbers more readable:

See Float literals in the language reference.

Reads a float from the given io in the given format.

Negates this value's sign.

Divides self by other using floored division.

The comparison operator.

Returns a Time::Span of self days.

Returns whether this value is finite, i.e.

Returns a Time::Span of self hours.

Checks whether this value is infinite.

Returns a Time::Span of self microseconds.

Returns a Time::Span of self milliseconds.

Returns a Time::Span of self minutes.

Returns whether this value is a not-a-number.

Returns a Time::Span of self nanoseconds.

Returns a Time::Span of self seconds.

Converts self to BigDecimal.

Returns a BigInt representing this float (rounded using floor).

Returns a BigRational representing this float.

Writes this float to the given io in the given format.

Returns a Time::Span of self weeks.

Reads a float from the given io in the given format. See also: IO#read_bytes.

Negates this value's sign.

Divides self by other using floored division.

The result will be of the same type as self.

The comparison operator. Returns 0 if the two objects are equal, a negative number if this object is considered less than other, a positive number if this object is considered greater than other, or nil if the two objects are not comparable.

Subclasses define this method to provide class-specific ordering.

The comparison operator is usually used to sort values:

Returns a Time::Span of self days.

Returns whether this value is finite, i.e. it is neither infinite nor a not-a-number.

Returns a Time::Span of self hours.

Checks whether this value is infinite. Returns 1 if this value is positive infinity, -1 if this value is negative infinity, or nil otherwise.

Returns a Time::Span of self microseconds.

Returns a Time::Span of self milliseconds.

Returns a Time::Span of self minutes.

Returns whether this value is a not-a-number.

This includes both quiet and signalling NaNs from IEEE 754.

Returns a Time::Span of self nanoseconds.

Returns a Time::Span of self seconds.

Converts self to BigDecimal.

NOTE Floats are fundamentally less precise than BigDecimals, which makes conversion to them risky.

Returns a BigInt representing this float (rounded using floor).

Returns a BigRational representing this float.

Writes this float to the given io in the given format. See also: IO#write_bytes.

Returns a Time::Span of self weeks.

**Examples:**

Example 1 (unknown):
```unknown
1.0     # Float64
1.0_f32 # Float32
1_f32   # Float32

1e10   # Float64
1.5e10 # Float64
1.5e-7 # Float64

+1.3 # Float64
-0.5 # Float64
```

Example 2 (unknown):
```unknown
1_000_000.111_111 # better than 1000000.111111
```

Example 3 (json):
```json
# Sort in a descending way:
[3, 1, 2].sort { |x, y| y <=> x } # => [3, 2, 1]

# Sort in an ascending way:
[3, 1, 2].sort { |x, y| x <=> y } # => [1, 2, 3]
```

Example 4 (unknown):
```unknown
require "big"
1212341515125412412412421.0.to_big_d
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/Format/ISO_8601_DATE.html

**Contents:**
- module Time::Format::ISO_8601_DATE
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

The ISO 8601 date format.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

**Examples:**

Example 1 (yaml):
```yaml
Time::Format::ISO_8601_DATE.parse("2016-02-15")                      # => 2016-02-15 00:00:00Z
Time::Format::ISO_8601_DATE.format(Time.utc(2016, 2, 15, 4, 35, 50)) # => "2016-02-15"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/IO/Hexdump.html

**Contents:**
- class IO::Hexdump
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class IO
  - Class methods inherited from class IO
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

IO object that prints an hexadecimal dump of all transferred data.

Especially useful for debugging binary protocols on an IO, to understand better when and how data is sent or received.

By default IO::Hexdump won't print anything; you must specify which of #read, #write or both you want to print.

When data is read from io it will print something akin to the following on STDERR:

Sets the current position (in bytes) in this IO.

Reads at most slice.size bytes from this IO into slice.

DEPRECATED Use #read(slice : Bytes) instead

Writes the contents of slice into this IO.

DEPRECATED Use #write(slice : Bytes) instead

Sets the current position (in bytes) in this IO.

The IO class raises on this method, but some subclasses, notable IO::FileDescriptor and IO::Memory implement it.

Reads at most slice.size bytes from this IO into slice. Returns the number of bytes read, which is 0 if and only if there is no more data to read (so checking for 0 is the way to detect end of file).

DEPRECATED Use #read(slice : Bytes) instead

Writes the contents of slice into this IO.

DEPRECATED Use #write(slice : Bytes) instead

**Examples:**

Example 1 (julia):
```julia
require "io/hexdump"
socket = IO::Memory.new("abc")
io = IO::Hexdump.new(socket, output: STDERR, read: true)
```

Example 2 (unknown):
```unknown
00000000  50 52 49 20 2a 20 48 54  54 50 2f 32 2e 30 0d 0a  PRI * HTTP/2.0..
00000010  0d 0a 53 4d 0d 0a 0d 0a                           ..SM....
00000000  00 00 00 04                                       ....
00000000  00                                                .
00000000  00 00 00 00                                       ....
```

Example 3 (javascript):
```javascript
File.write("testfile", "hello")

file = File.new("testfile")
file.pos = 3
file.gets_to_end # => "lo"
```

Example 4 (javascript):
```javascript
io = IO::Memory.new "hello"
slice = Bytes.new(4)
io.read(slice) # => 4
slice          # => Bytes[104, 101, 108, 108]
io.read(slice) # => 1
slice          # => Bytes[111, 101, 108, 108]
io.read(slice) # => 0
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Bytes.html

**Contents:**
- alias Bytes
- Overview
- Alias Definition
- Defined in:

A convenient alias for the most common slice type, a slice of bytes, used for example in IO#read and IO#write.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/URI/Params.html

**Contents:**
- struct URI::Params
- Overview
- Included Modules
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Enumerable({String, String})
  - Class methods inherited from module Enumerable({String, String})
  - Instance methods inherited from struct Struct

An ordered multi-value mapped collection representing generic URI parameters.

Returns an empty URI::Params.

Parses an URI query string into a URI::Params

Builds an url-encoded URI form/query.

Builds an url-encoded URI form/query.

Appends the given key value pairs as a url-encoded URI form/query to the given io.

Appends the given key value pairs as a url-encoded URI form/query to the given io.

Returns the given key value pairs as a url-encoded URI form/query.

Returns the given key value pairs as a url-encoded URI form/query.

Parses an URI query and yields each key-value pair.

Returns first value for specified param name.

Sets the name key to value.

Returns first value or nil for specified param name.

Appends new value for specified param name.

Returns a copy of this URI::Params instance.

Deletes first value for provided param name.

Deletes all values for provided param name.

Returns a copy of this URI::Params instance.

Allows to iterate over all name-value pairs.

Returns true if params is empty.

Returns true if params is empty.

Returns first value for specified param name.

Returns first value for specified param name.

Returns all values for specified param name.

Returns true if param with provided name exists.

Returns true if param with provided name exists.

See Object#hash(hasher)

Appends this struct's name and instance variables names and values to the given IO.

Merges params and self into a new instance.

Merges params into self.

Sets all values for specified param name at once.

Serializes to string representation as http url-encoded form.

Serializes to string representation as http url-encoded form.

Returns an empty URI::Params.

Parses an URI query string into a URI::Params

Builds an url-encoded URI form/query.

The yielded object has an #add method that accepts two arguments, a key (String) and a value (String or Nil). Keys and values are escaped using URI.encode_www_form.

By default spaces are outputted as +. If space_to_plus is false then they are outputted as %20:

Builds an url-encoded URI form/query.

The yielded object has an #add method that accepts two arguments, a key (String) and a value (String or Nil). Keys and values are escaped using URI.encode_www_form.

By default spaces are outputted as +. If space_to_plus is false then they are outputted as %20:

Appends the given key value pairs as a url-encoded URI form/query to the given io.

Appends the given key value pairs as a url-encoded URI form/query to the given io.

Returns the given key value pairs as a url-encoded URI form/query.

Returns the given key value pairs as a url-encoded URI form/query.

Parses an URI query and yields each key-value pair.

Returns first value for specified param name.

Sets the name key to value.

Returns first value or nil for specified param name.

Appends new value for specified param name. Creates param when there was no such param.

Returns a copy of this URI::Params instance.

Deletes first value for provided param name. If there are no values left, deletes param itself. Returns deleted value.

Deletes all values for provided param name. Returns array of deleted values.

Returns a copy of this URI::Params instance.

Allows to iterate over all name-value pairs.

Returns true if params is empty.

Returns true if params is empty.

Returns first value for specified param name. Falls back to provided default value when there is no such param.

Returns first value for specified param name. Falls back to return value of provided block when there is no such param.

Returns all values for specified param name.

Returns true if param with provided name exists.

Returns true if param with provided name exists.

See Object#hash(hasher)

Appends this struct's name and instance variables names and values to the given IO.

Merges params and self into a new instance. If replace is false values with the same key are concatenated. Otherwise the value in params overrides the one in self.

See #merge! for a mutating alternative

Merges params into self.

See #merge for a non-mutating alternative

Sets all values for specified param name at once.

Serializes to string representation as http url-encoded form.

By default spaces are outputted as +. If space_to_plus is false then they are outputted as %20:

Serializes to string representation as http url-encoded form.

By default spaces are outputted as +. If space_to_plus is false then they are outputted as %20:

**Examples:**

Example 1 (yaml):
```yaml
require "uri/params"

URI::Params.parse("foo=bar&foo=baz&qux=zoo")
# => #<URI::Params @raw_params = {"foo" => ["bar", "baz"], "qux" => ["zoo"]}>
```

Example 2 (julia):
```julia
require "uri/params"

params = URI::Params.build do |form|
  form.add "color", "black"
  form.add "name", "crystal"
  form.add "year", "2012 - today"
end
params # => "color=black&name=crystal&year=2012+-+today"
```

Example 3 (julia):
```julia
require "uri/params"

params = URI::Params.build(space_to_plus: false) do |form|
  form.add "year", "2012 - today"
end
params # => "year=2012%20-%20today"
```

Example 4 (julia):
```julia
require "uri/params"

params = URI::Params.build do |form|
  form.add "color", "black"
  form.add "name", "crystal"
  form.add "year", "2012 - today"
end
params # => "color=black&name=crystal&year=2012+-+today"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/EpochMillisConverter.html

**Contents:**
- module Time::EpochMillisConverter
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

Converter to be used with JSON::Serializable and YAML::Serializable to serialize a Time instance as the number of milliseconds since the unix epoch. See Time#to_unix_ms.

**Examples:**

Example 1 (json):
```json
require "json"

class Timestamp
  include JSON::Serializable

  @[JSON::Field(converter: Time::EpochMillisConverter)]
  property value : Time
end

timestamp = Timestamp.from_json(%({"value": 1459860483856}))
timestamp.value   # => 2016-04-05 12:48:03.856Z
timestamp.to_json # => %({"value":1459860483856})
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/NotImplementedError.html

**Contents:**
- class NotImplementedError
- Overview
- Defined in:
- Constructors
  - Instance methods inherited from class Exception
  - Constructor methods inherited from class Exception
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Raised when a method is not implemented.

This can be used either to stub out method bodies, or when the method is not implemented on the current platform.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/YAML/Nodes.html

**Contents:**
- module YAML::Nodes
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

The YAML::Nodes module provides an implementation of an in-memory YAML document tree. This tree can be generated with the YAML::Nodes.parse method or created with a YAML::Nodes::Builder.

This document tree can then be converted to YAML be invoking to_yaml on the document object.

Parses a String or IO into a YAML::Document.

Parses a String or IO into a YAML::Document.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/Server/Context.html

**Contents:**
- class HTTP::Server::Context
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Instances of this class are passed to an HTTP::Server handler.

The HTTP::Request to process.

The HTTP::Server::Response to configure and write to.

The HTTP::Request to process.

The HTTP::Server::Response to configure and write to.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/TargetMachine.html

**Contents:**
- class LLVM::TargetMachine
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/YAML/Nodes/Sequence.html

**Contents:**
- class YAML::Nodes::Sequence
- Overview
- Included Modules
- Defined in:
- Instance Method Summary
  - Instance methods inherited from module Enumerable(YAML::Nodes::Node)
  - Class methods inherited from module Enumerable(YAML::Nodes::Node)
  - Instance methods inherited from class YAML::Nodes::Node
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference

Appends a node into this sequence.

Must yield this collection's elements to the block.

Returns the kind of this node, which is equivalent to the class name.

The nodes in this sequence.

The style of this sequence.

The style of this sequence.

Appends a node into this sequence.

Must yield this collection's elements to the block.

Returns the kind of this node, which is equivalent to the class name.

The nodes in this sequence.

The style of this sequence.

The style of this sequence.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Benchmark/IPS/Job.html

**Contents:**
- class Benchmark::IPS::Job
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

DEPRECATED Use .new(Time::Span, Time::Span, Bool) instead.

List of all entries in the benchmark.

List of all entries in the benchmark.

Adds code to be benchmarked

DEPRECATED Use .new(Time::Span, Time::Span, Bool) instead.

List of all entries in the benchmark. After #execute, these are populated with the resulting statistics.

List of all entries in the benchmark. After #execute, these are populated with the resulting statistics.

Adds code to be benchmarked

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Zip/Reader/Entry.html

**Contents:**
- class Compress::Zip::Reader::Entry
- Overview
- Included Modules
- Defined in:
- Instance Method Summary
  - Instance methods inherited from module Compress::Zip::FileInfo
  - Constructor methods inherited from module Compress::Zip::FileInfo
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

A entry inside a Zip::Reader.

Use the #io method to read from it.

Returns an IO to the entry's data.

Returns an IO to the entry's data.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Dir.html

**Contents:**
- class Dir
- Overview
- Included Modules
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Iterable(String)
  - Instance methods inherited from module Enumerable(String)
  - Class methods inherited from module Enumerable(String)

Objects of class Dir are directory streams representing directories in the underlying file system. They provide a variety of ways to list directories and their contents.

The directory used in these examples contains the two regular files (config.h and main.rb), the parent directory (..), and the directory itself (.).

Returns a new directory object for the named directory.

Returns an array of all files that match against any of patterns.

Returns an array of all files that match against any of patterns.

DEPRECATED Use the overload with a match parameter instead

Returns an array of all files that match against any of patterns.

Returns an array of all files that match against any of patterns.

DEPRECATED Use the overload with a match parameter instead

Changes the current working directory of the process to the given string.

Changes the current working directory of the process to the given string and invokes the block, restoring the original working directory when the block exits.

Returns an absolute path to the current working directory.

Removes the directory at path.

Removes the directory at path, or returns false if the directory does not exist.

Returns true if the directory at path is empty, otherwise returns false.

Returns true if the given path exists and is a directory

Returns an array of all files that match against any of patterns.

Returns an array of all files that match against any of patterns.

DEPRECATED Use the overload with a match parameter instead

Returns an array of all files that match against any of patterns.

Returns an array of all files that match against any of patterns.

DEPRECATED Use the overload with a match parameter instead

Yields all files that match against any of patterns.

Yields all files that match against any of patterns.

DEPRECATED Use the overload with a match parameter instead

Yields all files that match against any of patterns.

Yields all files that match against any of patterns.

DEPRECATED Use the overload with a match parameter instead

Creates a new directory at the given path.

Creates a new directory at the given path, including any non-existing intermediate directories.

Opens a directory and yields it, closing it at the end of the block.

Returns the tmp dir used for tempfile.

Returns an array containing all of the filenames except for . and .. in the given directory.

Closes the directory stream.

Calls the block once for each entry in this directory, passing the filename of each entry as a parameter to the block.

Must return an Iterator over the elements in this collection.

Calls the block once for each entry except for . and .. in this directory, passing the filename of each entry as a parameter to the block.

Returns an iterator over of the all entries in this directory except for . and ...

Returns an array containing all of entries in the given directory including "." and "..".

This method is faster than .info and avoids race conditions if a Dir is already open on POSIX systems, but not necessarily on windows.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Returns the path of this directory.

Reads the next entry from dir and returns it as a string.

Repositions this directory to the first entry.

Appends a short String representation of this object which includes its class name and its object address.

Returns a new directory object for the named directory.

Returns an array of all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

Returns an array of all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

For compatibility, a falsey match_hidden argument is equivalent to passing match: File::MatchOptions.glob_default, and a truthy match_hidden is equivalent to match: File::MatchOptions.glob_default | File::MatchOptions::DotFiles.

DEPRECATED Use the overload with a match parameter instead

Returns an array of all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

Returns an array of all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

For compatibility, a falsey match_hidden argument is equivalent to passing match: File::MatchOptions.glob_default, and a truthy match_hidden is equivalent to match: File::MatchOptions.glob_default | File::MatchOptions::DotFiles.

DEPRECATED Use the overload with a match parameter instead

Changes the current working directory of the process to the given string.

Changes the current working directory of the process to the given string and invokes the block, restoring the original working directory when the block exits.

Returns an absolute path to the current working directory.

The result is similar to the shell commands pwd (POSIX) and .cd (Windows).

On POSIX systems, it respects the environment value $PWD if available and if it points to the current working directory.

Removes the directory at path. Raises File::Error on failure.

On Windows, also raises File::Error if path points to a directory that is a reparse point, such as a symbolic link. Those directories can be deleted using File.delete instead.

Removes the directory at path, or returns false if the directory does not exist. Raises File::Error on other kinds of failure.

On Windows, also raises File::Error if path points to a directory that is a reparse point, such as a symbolic link. Those directories can be deleted using File.delete? instead.

Returns true if the directory at path is empty, otherwise returns false. Raises File::NotFoundError if the directory at path does not exist.

Returns true if the given path exists and is a directory

Returns an array of all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

Returns an array of all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

For compatibility, a falsey match_hidden argument is equivalent to passing match: File::MatchOptions.glob_default, and a truthy match_hidden is equivalent to match: File::MatchOptions.glob_default | File::MatchOptions::DotFiles.

DEPRECATED Use the overload with a match parameter instead

Returns an array of all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

Returns an array of all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

For compatibility, a falsey match_hidden argument is equivalent to passing match: File::MatchOptions.glob_default, and a truthy match_hidden is equivalent to match: File::MatchOptions.glob_default | File::MatchOptions::DotFiles.

DEPRECATED Use the overload with a match parameter instead

Yields all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

Yields all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

For compatibility, a falsey match_hidden argument is equivalent to passing match: File::MatchOptions.glob_default, and a truthy match_hidden is equivalent to match: File::MatchOptions.glob_default | File::MatchOptions::DotFiles.

DEPRECATED Use the overload with a match parameter instead

Yields all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

Yields all files that match against any of patterns.

The pattern syntax is similar to shell filename globbing, see File.match? for details.

NOTE Path separator in patterns needs to be always /. The returned file names use system-specific path separators.

For compatibility, a falsey match_hidden argument is equivalent to passing match: File::MatchOptions.glob_default, and a truthy match_hidden is equivalent to match: File::MatchOptions.glob_default | File::MatchOptions::DotFiles.

DEPRECATED Use the overload with a match parameter instead

Creates a new directory at the given path. The linux-style permission mode can be specified, with a default of 777 (0o777).

NOTE mode is ignored on windows.

Creates a new directory at the given path, including any non-existing intermediate directories. The linux-style permission mode can be specified, with a default of 777 (0o777).

Opens a directory and yields it, closing it at the end of the block. Returns the value of the block.

Returns the tmp dir used for tempfile.

Returns an array containing all of the filenames except for . and .. in the given directory.

Closes the directory stream.

Calls the block once for each entry in this directory, passing the filename of each entry as a parameter to the block.

Must return an Iterator over the elements in this collection.

Calls the block once for each entry except for . and .. in this directory, passing the filename of each entry as a parameter to the block.

Returns an iterator over of the all entries in this directory except for . and ...

Returns an array containing all of entries in the given directory including "." and "..".

This method is faster than .info and avoids race conditions if a Dir is already open on POSIX systems, but not necessarily on windows.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Returns the path of this directory.

Reads the next entry from dir and returns it as a string. Returns nil at the end of the stream.

Repositions this directory to the first entry.

Appends a short String representation of this object which includes its class name and its object address.

**Examples:**

Example 1 (javascript):
```javascript
Dir.mkdir("bar")
Dir.empty?("bar") # => true
File.write("bar/a_file", "The content")
Dir.empty?("bar") # => false
```

Example 2 (javascript):
```javascript
Dir.mkdir("testdir")
Dir.exists?("testdir") # => true
```

Example 3 (julia):
```julia
Dir.glob "path/to/folder/*.txt" # Returns all files in the target folder that end in ".txt".
Dir.glob "path/to/folder/**/*"  # Returns all files in the target folder and its subfolders.
```

Example 4 (julia):
```julia
Dir.glob "path/to/folder/*.txt" # Returns all files in the target folder that end in ".txt".
Dir.glob "path/to/folder/**/*"  # Returns all files in the target folder and its subfolders.
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Zip.html

**Contents:**
- module Compress::Zip
- Overview
  - Reading zip files
  - Writer zip files
- Defined in:
- Constant Summary

The Compress::Zip module contains readers and writers of the zip file format, described at PKWARE's site.

NOTE To use Zip or its children, you must explicitly import it with require "compress/zip"

Two types are provided to read from zip files:

Compress::Zip::File is the preferred method to read zip files if you can provide a File, because it's a bit more flexible and provides more complete information for zip entries (such as comments).

When reading zip files, CRC32 checksum values are automatically verified when finishing reading an entry, and Compress::Zip::Error will be raised if the computed CRC32 checksum does not match.

Use Compress::Zip::Writer, which writes zip entries sequentially to any IO.

NOTE only compression methods 0 (STORED) and 8 (DEFLATED) are supported. Additionally, ZIP64 is not yet supported.

---

## out¶

**URL:** https://crystal-lang.org/reference/1.18/syntax_and_semantics/c_bindings/out.html

**Contents:**
- out¶

Consider the waitpid function:

The documentation of the function says:

We can use this function like this:

In this way we pass a pointer of status_ptr to the function for it to fill its value.

There's a simpler way to write the above by using an out parameter:

The compiler will automatically declare a status_ptr variable of type Int32, because the parameter's type is Int32*.

This will work for any fun parameter, as long as its type is a pointer (and, of course, as long as the function does fill the value the pointer is pointing to).

**Examples:**

Example 1 (julia):
```julia
lib C
  fun waitpid(pid : Int32, status_ptr : Int32*, options : Int32) : Int32
end
```

Example 2 (sql):
```sql
The status information from the child process is stored in the object
that status_ptr points to, unless status_ptr is a null pointer.
```

Example 3 (unknown):
```unknown
status_ptr = uninitialized Int32

C.waitpid(pid, pointerof(status_ptr), options)
```

Example 4 (unknown):
```unknown
C.waitpid(pid, out status_ptr, options)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log.html

**Contents:**
- class Log
- Overview
  - Default logging configuration
  - Configure logging explicitly in the code
  - Configure logging from environment variables
- Defined in:
- Constructors
- Class Method Summary
- Macro Summary
- Instance Method Summary

The Log class provides a logging utility that you can use to output messages.

The messages, or Log::Entry have associated levels, such as Info or Error that indicate their importance. See Log::Severity.

To log a message use the #trace, #debug, #info, #notice, #warn, #error, and #fatal methods. They expect a block that will evaluate to the message of the entry:

NOTE To use Log, you must explicitly import it with require "log"

Data can be associated with a log entry via the Log::Emitter yielded in the logging methods.

If you want to log an exception, you can indicate it in the exception: named argument.

The block is only evaluated if the current message is to be emitted to some Log::Backend.

To add structured information to the message you can use the Log::Context.

When creating log messages they belong to a source. If the top-level Log is used as in the above examples its source is the empty string.

The source can be used to identify the module or part of the application that is logging. You can configure for each source a different level to filter the messages.

A recommended pattern is to declare a Log constant in the namespace of your shard or module as follows:

That way, any Log.info call within the DB module will use the db source. And not the top-level ::Log.info.

Sources can be nested. Continuing the last example, to declare a Log constant db.pool source you can do as follows:

A Log will emit the messages to the Log::Backends attached to it as long as the configured severity filter #level permits it.

Logs can also be created from a type directly. For the type DB::Pool the source db.pool will be used. For generic types as Foo::Bar(Baz) the source foo.bar will be used (i.e. without generic arguments).

By default entries from all sources with Info and above severity will be logged to STDOUT using the Log::IOBackend.

If you need to change the default level, backend or sources call Log.setup upon startup.

NOTE Calling .setup will override previous .setup calls.

Use Log.setup methods to indicate which sources should go to which backends.

You can indicate actual sources or patterns.

The following configuration will setup for all sources to emit warnings (or higher) to STDOUT, allow any of the db.* and nested source to emit debug (or higher), and to also emit for all sources errors (or higher) to an elasticsearch backend.

Include the following line to allow configuration from environment variables.

The environment variable LOG_LEVEL is used to indicate which severity level to emit. By default entries from all sources with Info and above severity will be logged to STDOUT using the Log::IOBackend.

To change the level and sources change the environment variable value:

You can tweak the default values (used when LOG_LEVEL variable is not defined):

Creates a Log for the given source.

Creates a Log for the given type.

Returns the default Log::Builder used for Log.for calls.

Returns and yields an EntriesChecker that allows checking specific log entries were emitted.

Returns and yields an EntriesChecker that allows checking specific log entries were emitted.

Returns the current fiber logging context.

Sets the current fiber logging context.

Sets the current fiber logging context.

The program name used for log entries

The program name used for log entries

Setups logging bindings discarding all previous configurations.

Setups logging for sources using the specified level, backend.

Setups logging for all sources using the specified level, backend.

Setups logging based on LOG_LEVEL environment variable.

Method to save and restore the current logging context.

Method to save and restore the current logging context.

Generate subclasses of Log::StaticFormatter from a string with interpolations

Returns the current fiber logging context.

Sets the current fiber logging context.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Debug.

Logs a message if the logger's current severity is lower than or equal to Severity::Debug.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Error.

Logs a message if the logger's current severity is lower than or equal to Severity::Error.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Fatal.

Logs a message if the logger's current severity is lower than or equal to Severity::Fatal.

Creates a Log for the given nested source.

Creates a Log for the given type.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Info.

Logs a message if the logger's current severity is lower than or equal to Severity::Info.

Change this log severity level filter.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Notice.

Logs a message if the logger's current severity is lower than or equal to Severity::Notice.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Trace.

Logs a message if the logger's current severity is lower than or equal to Severity::Trace.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Warn.

Logs a message if the logger's current severity is lower than or equal to Severity::Warn.

Method to save and restore the current logging context.

Method to save and restore the current logging context.

Creates a Log for the given source. If level is given, it will override the configuration.

Creates a Log for the given type. A type Foo::Bar(Baz) corresponds to the source foo.bar. If level is given, it will override the configuration.

Returns the default Log::Builder used for Log.for calls.

Returns and yields an EntriesChecker that allows checking specific log entries were emitted.

This capture will even work if there are currently no backends configured, effectively adding a temporary backend.

By default logs of all sources and severities will be captured.

Use level to only capture of the given severity or above.

Use source to narrow which source are captured. Values that represent single pattern like http.* are allowed.

The EntriesChecker will hold a list of emitted entries.

EntriesChecker#check will find the next entry which matches the level and message. EntriesChecker#next will validate that the following entry in the list matches the given level and message. EntriesChecker#clear will clear the emitted and captured entries.

With these methods it is possible to express expected traces in either a strict or loose way, while checking ordering.

EntriesChecker#entry returns the last matched Entry. Useful to check additional entry properties other than the message.

EntriesChecker#empty validates there are no pending entries to match.

Using the yielded EntriesChecker allows clearing the entries between statements.

Invocations can be nested in order to capture each source in their own EntriesChecker.

Returns and yields an EntriesChecker that allows checking specific log entries were emitted.

This capture will even work if there are currently no backends configured, effectively adding a temporary backend.

By default logs of all sources and severities will be captured.

Use level to only capture of the given severity or above.

Use source to narrow which source are captured. Values that represent single pattern like http.* are allowed.

The EntriesChecker will hold a list of emitted entries.

EntriesChecker#check will find the next entry which matches the level and message. EntriesChecker#next will validate that the following entry in the list matches the given level and message. EntriesChecker#clear will clear the emitted and captured entries.

With these methods it is possible to express expected traces in either a strict or loose way, while checking ordering.

EntriesChecker#entry returns the last matched Entry. Useful to check additional entry properties other than the message.

EntriesChecker#empty validates there are no pending entries to match.

Using the yielded EntriesChecker allows clearing the entries between statements.

Invocations can be nested in order to capture each source in their own EntriesChecker.

Returns the current fiber logging context.

Sets the current fiber logging context.

Sets the current fiber logging context.

The program name used for log entries

Defaults to the executable name

The program name used for log entries

Defaults to the executable name

Setups logging bindings discarding all previous configurations.

Setups logging for sources using the specified level, backend.

Setups logging for all sources using the specified level, backend.

Setups logging based on LOG_LEVEL environment variable.

Method to save and restore the current logging context. Temporary context for the duration of the block can be set via arguments.

Method to save and restore the current logging context. Temporary context for the duration of the block can be set via arguments.

Generate subclasses of Log::StaticFormatter from a string with interpolations

See Log::StaticFormatter for the available methods that can be called within the interpolations.

Returns the current fiber logging context.

Sets the current fiber logging context.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Debug.

Logs a message if the logger's current severity is lower than or equal to Severity::Debug.

The block is not called unless the current severity level would emit a message.

Blocks which return nil do not emit anything:

Logs the given exception if the logger's current severity is lower than or equal to Severity::Error.

Logs a message if the logger's current severity is lower than or equal to Severity::Error.

The block is not called unless the current severity level would emit a message.

Blocks which return nil do not emit anything:

Logs the given exception if the logger's current severity is lower than or equal to Severity::Fatal.

Logs a message if the logger's current severity is lower than or equal to Severity::Fatal.

The block is not called unless the current severity level would emit a message.

Blocks which return nil do not emit anything:

Creates a Log for the given nested source. If level is given, it will override the configuration.

Creates a Log for the given type. A type Foo::Bar(Baz) corresponds to the source foo.bar. If level is given, it will override the configuration.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Info.

Logs a message if the logger's current severity is lower than or equal to Severity::Info.

The block is not called unless the current severity level would emit a message.

Blocks which return nil do not emit anything:

Change this log severity level filter.

Logs the given exception if the logger's current severity is lower than or equal to Severity::Notice.

Logs a message if the logger's current severity is lower than or equal to Severity::Notice.

The block is not called unless the current severity level would emit a message.

Blocks which return nil do not emit anything:

Logs the given exception if the logger's current severity is lower than or equal to Severity::Trace.

Logs a message if the logger's current severity is lower than or equal to Severity::Trace.

The block is not called unless the current severity level would emit a message.

Blocks which return nil do not emit anything:

Logs the given exception if the logger's current severity is lower than or equal to Severity::Warn.

Logs a message if the logger's current severity is lower than or equal to Severity::Warn.

The block is not called unless the current severity level would emit a message.

Blocks which return nil do not emit anything:

Method to save and restore the current logging context. Temporary context for the duration of the block can be set via arguments.

Method to save and restore the current logging context. Temporary context for the duration of the block can be set via arguments.

**Examples:**

Example 1 (css):
```css
require "log"

Log.info { "Program started" }
```

Example 2 (json):
```json
Log.info &.emit("User logged in", user_id: 42)
```

Example 3 (json):
```json
Log.warn(exception: e) { "Oh no!" }
Log.warn exception: e, &.emit("Oh no!", user_id: 42)
```

Example 4 (julia):
```julia
module DB
  Log = ::Log.for("db") # Log for db source

  def do_something
    Log.info { "this is logged in db source" }
  end
end

DB::Log.info { "this is also logged in db source" }
Log.for("db").info { "this is also logged in db source" }
Log.info { "this is logged in top-level source" }
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OAuth/Consumer.html

**Contents:**
- class OAuth::Consumer
- Overview
  - Example
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

For a quick example of how to authenticate an HTTP::Client with OAuth if you already have an access token, check the OAuth module description.

This class also provides methods to get request tokens, build authorize URIs and get access tokens, as specified by RFC 5849.

Creates an OAuth consumer.

Authenticated an HTTP::Client to add an OAuth authorization header, as specified by RFC 5849, Section 3.

Gets an access token from a previously obtained request token and an oauth_verifier obtained from an authorize URI, as specified by RFC 5849, Section 2.3.

Returns an authorize URI from a given request token to redirect the user to obtain an access token, as specified by RFC 5849, Section 2.2.

Returns an authorize URI from a given request token to redirect the user to obtain an access token, as specified by RFC 5849, Section 2.2.

Obtains a request token, also known as "temporary credentials", as specified by RFC 5849, Section 2.1.

Creates an OAuth consumer.

Any or all of the customizable URIs request_token_uri, authorize_uri and access_token_uri can be relative or absolute. If they are relative, the given host, port and scheme will be used. If they are absolute, the absolute URL will be used.

Authenticated an HTTP::Client to add an OAuth authorization header, as specified by RFC 5849, Section 3.

Gets an access token from a previously obtained request token and an oauth_verifier obtained from an authorize URI, as specified by RFC 5849, Section 2.3.

Raises OAuth::Error if there was an error getting the access token.

Returns an authorize URI from a given request token to redirect the user to obtain an access token, as specified by RFC 5849, Section 2.2.

Returns an authorize URI from a given request token to redirect the user to obtain an access token, as specified by RFC 5849, Section 2.2.

Yields an URI::Params::Builder to add extra parameters other than those defined by the standard.

Obtains a request token, also known as "temporary credentials", as specified by RFC 5849, Section 2.1.

Raises OAuth::Error if there was an error getting the request token.

**Examples:**

Example 1 (markdown):
```markdown
require "oauth"

consumer_key = "some_key"
consumer_secret = "some_secret"
oauth_callback = "http://some.callback"

# Create consumer, optionally pass custom URIs if needed,
# if the request, authorize or access_token URIs are not the standard ones
# (they can also be absolute URLs)
consumer = OAuth::Consumer.new("api.example.com", consumer_key, consumer_secret)

# Get a request token.
# We probably need to save this somewhere to get it back in the
# callback URL (saving token and secret should be enough)
request_token = consumer.get_request_token(oauth_callback)

# Build an authorize URI
authorize_uri = consumer.get_authorize_uri(request_token, oauth_callback)

# Redirect the user to `authorize_uri`...
#
# ...
#
# When http://some.callback is hit, once the user authorized the access,
# we resume our logic to finally get an access token. The callback URL
# should receive an `oauth_verifier` parameter that we need to use.
oauth_verifier = request.params["oauth_verifier"]

# Get the access token
access_token = consumer.get_access_token(request_token, oauth_verifier)

# Probably save the access token for reuse... This can be done
# with `to_json` and `from_json`.

# Use the token to authenticate an HTTP::Client
client = HTTP::Client.new("api.example.com", tls: true)
access_token.authenticate(client, consumer_key, consumer_secret)

# And do requests as usual
client.get "/some_path"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Fiber/ExecutionContext/Parallel/Scheduler.html

**Contents:**
- class Fiber::ExecutionContext::Parallel::Scheduler
- Overview
- Included Modules
- Defined in:
- Instance Method Summary
  - Instance methods inherited from module Fiber::ExecutionContext::Scheduler
  - Constructor methods inherited from module Fiber::ExecutionContext::Scheduler
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Individual scheduler for the parallel execution context.

The execution context itself doesn't run the fibers. The fibers actually run in the schedulers. Each scheduler in the context increases the parallelism by one. For example a parallel context with 8 schedulers means that a maximum of 8 fibers may run at the same time in different system threads.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Returns the current status of the scheduler.

Appends a short String representation of this object which includes its class name and its object address.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Returns the current status of the scheduler. For example "running", "event-loop" or "parked".

Appends a short String representation of this object which includes its class name and its object address.

**Examples:**

Example 1 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).inspect # => #<Person:0x10fd31f20 @name="John", @age=32>
```

Example 2 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).to_s # => #<Person:0x10a199f20>
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Flags.html

**Contents:**
- annotation Flags
- Overview
- Defined in:

An enum can be marked with @[Flags]. This changes the default values. The first constant's value is 1, and successive constants are multiplied by 2.

**Examples:**

Example 1 (julia):
```julia
@[Flags]
enum IOMode
  Read  # 1
  Write # 2
  Async # 4
end

(IOMode::Write | IOMode::Async).value # => 6
(IOMode::Write | IOMode::Async).to_s  # => "Write | Async"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Spec/Example/Procsy.html

**Contents:**
- struct Spec::Example::Procsy
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Wraps an Example and a Proc that will eventually execute the example.

The example that will eventually run when calling #run.

Executes the wrapped example, possibly executing other around_each hooks before that.

The example that will eventually run when calling #run.

Executes the wrapped example, possibly executing other around_each hooks before that.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/CSV.html

**Contents:**
- class CSV
- Overview
  - Parsing
  - Parsing with CSV#new
  - Example
  - Building
- Defined in:
- Constant Summary
- Constructors
- Class Method Summary

Provides methods and classes for parsing and generating CSV (comma-separated values) strings.

This module conforms to RFC 4180.

NOTE To use CSV or its children, you must explicitly import it with require "csv"

Several ways of parsing CSV are provided. The most straight-forward, but slow or inefficient for some scenarios, is CSV#parse, which returns an array of arrays of all data.

Rows can be traversed in a linear fashion with CSV#each_row, or using an Iterator.

To parse a CSV in an efficient way, optionally being able to access row values from header names, create an instance of a CSV.

A CSV instance holds a cursor to the current row in the CSV. The cursor is advanced by invoking #next, which returns true if a next row was found, and false otherwise. A first call to #next is required to position the CSV parser in the first row.

Once positioned in a row, values can be obtained with the several #[] methods, which can accept a header name, column position, or header name pattern as a Regex.

Additionally, a Row object can be obtained with the #row method which provides similar methods and can be converted to an Array or Hash.

To create CSV data, check CSV#build and the CSV::Builder class.

Creates a new instance from the given String or IO.

Creates a new instance from the given String or IO, and yields it to the given block once for each row in the CSV.

Appends CSV data to the given IO.

Yields each of a CSV's rows as an Array(String).

Returns an Iterator of Array(String) over a CSV's rows.

Parses a CSV or IO into an array.

Returns the current row's value corresponding to the given header name.

Returns the current row's value at the given column index.

Returns the current row's value corresponding to the given header_pattern.

Returns the current row's value corresponding to the given header name.

Returns the current row's value at the given column index.

Returns the current row's value corresponding to the given header_pattern.

Invokes the block once for each row in this CSV, yielding self.

Returns this CSV headers.

Advanced the cursor to the next row.

Rewinds this CSV to the beginning, rewinding the underlying IO if any.

Returns the current row as a Row instance.

Returns a tuple of the current row's values at given indices A negative index counts from the end.

Returns a tuple of the current row's values corresponding to the given headers Raises KeyError if any header doesn't exist.

Creates a new instance from the given String or IO.

See CSV.parse about the separator and quote_char arguments.

Creates a new instance from the given String or IO, and yields it to the given block once for each row in the CSV.

See CSV.parse about the separator and quote_char arguments.

Builds a CSV. This yields a CSV::Builder to the given block.

Takes optional quoting argument to define quote behavior.

See: CSV::Builder::Quoting

Appends CSV data to the given IO. This yields a CSV::Builder that writes to the given IO.

Yields each of a CSV's rows as an Array(String).

See CSV.parse about the separator and quote_char arguments.

Returns an Iterator of Array(String) over a CSV's rows.

See CSV.parse about the separator and quote_char arguments.

Parses a CSV or IO into an array.

Takes optional separator and quote_char arguments for defining non-standard csv cell separators and quote characters.

Returns the current row's value corresponding to the given header name. Raises KeyError if no such header exists. Raises CSV::Error if headers were not requested.

Returns the current row's value at the given column index. A negative index counts from the end. Raises IndexError if no such column exists.

Returns the current row's value corresponding to the given header_pattern. Raises KeyError if no such header exists. Raises CSV::Error if headers were not requested.

Returns the current row's value corresponding to the given header name. Returns nil if no such header exists. Raises CSV::Error if headers were not requested.

Returns the current row's value at the given column index. A negative index counts from the end. Returns nil if no such column exists.

Returns the current row's value corresponding to the given header_pattern. Returns nil if no such header exists. Raises CSV::Error if headers were not requested.

Invokes the block once for each row in this CSV, yielding self.

Returns this CSV headers. Their values are always stripped. Raises CSV::Error if headers were not requested.

Advanced the cursor to the next row. Must be called once to position the cursor in the first row. Returns true if a next row was found, false otherwise.

Rewinds this CSV to the beginning, rewinding the underlying IO if any.

Returns the current row as a Row instance.

Returns a tuple of the current row's values at given indices A negative index counts from the end. Raises IndexError if any column doesn't exist The behavior of returning a tuple is similar to Hash#values_at

Returns a tuple of the current row's values corresponding to the given headers Raises KeyError if any header doesn't exist. Raises CSV::Error if headers were not requested The behavior of returning a tuple is similar to Hash#values_at

**Examples:**

Example 1 (javascript):
```javascript
require "csv"

csv = CSV.new("Name, Age\nJohn, 20\nPeter, 30", headers: true)
csv.next # => true

csv["Name"]  # => "John"
csv[0]       # => "John"
csv[-2]      # => "John"
csv[/name/i] # => "John"

csv["Age"] # => " 20"

csv.row.to_a # => ["John", " 20"]
csv.row.to_h # => {"Name" => "John", "Age" => " 20"}

csv.next    # => true
csv["Name"] # => "Peter"

csv.next # => false
```

Example 2 (julia):
```julia
require "csv"

result = CSV.build do |csv|
  csv.row "one", "two"
  csv.row "three"
end
result # => "one,two\nthree\n"
result = CSV.build(quoting: CSV::Builder::Quoting::ALL) do |csv|
  csv.row "one", "two"
  csv.row "three"
end
result # => "\"one\",\"two\"\n\"three\"\n"
```

Example 3 (julia):
```julia
require "csv"

io = IO::Memory.new
io.puts "HEADER"
CSV.build(io) do |csv|
  csv.row "one", "two"
  csv.row "three"
end
io.to_s # => "HEADER\none,two\nthree\n"
```

Example 4 (julia):
```julia
require "csv"

CSV.each_row("one,two\nthree") do |row|
  puts row
end
```

---

## C bindings¶

**URL:** https://crystal-lang.org/reference/1.18/syntax_and_semantics/c_bindings/index.html

**Contents:**
- C bindings¶

Crystal allows you to bind to existing C libraries without writing a single line in C.

Additionally, it provides some conveniences like out and to_unsafe so writing bindings is as painless as possible.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/YAML/Serializable.html

**Contents:**
- module YAML::Serializable
- Overview
  - Example
  - Usage
  - Extensions: YAML::Serializable::Strict and YAML::Serializable::Unmapped.
  - Class annotation YAML::Serializable::Options
  - Discriminator field
  - after_initialize method
- Defined in:
- Macro Summary

The YAML::Serializable module automatically generates methods for YAML serialization when included.

Including YAML::Serializable will create #to_yaml and self.from_yaml methods on the current class, and a constructor which takes a YAML::PullParser. By default, these methods serialize into a yaml object containing the value of every instance variable, the keys being the instance variable name. Most primitives and collections supported as instance variable values (string, integer, array, hash, etc.), along with objects which define to_yaml and a constructor taking a YAML::PullParser. Union types are also supported, including unions with nil. If multiple types in a union parse correctly, it is undefined which one will be chosen.

To change how individual instance variables are parsed and serialized, the annotation YAML::Field can be placed on the instance variable. Annotating property, getter and setter macros is also allowed.

YAML::Field properties:

Deserialization also respects default values of variables:

NOTE YAML::Serializable defines an internal constructor on any including type, which means the default constructor (def initialize; end) is absent unless explicitly defined by the user, even when all instance variables have a default initializer.

If the YAML::Serializable::Strict module is included, unknown properties in the YAML document will raise a parse exception. By default the unknown properties are silently ignored. If the YAML::Serializable::Unmapped module is included, unknown properties in the YAML document will be stored in a Hash(String, YAML::Any). On serialization, any keys inside yaml_unmapped will be serialized appended to the current yaml object.

supported properties:

A very common YAML serialization strategy for handling different objects under a same hierarchy is to use a discriminator field. For example in GeoJSON each object has a "type" field, and the rest of the fields, and their meaning, depend on its value.

You can use YAML::Serializable.use_yaml_discriminator for this use case.

#after_initialize is a method that runs after an instance is deserialized from YAML. It can be used as a hook to post-process the initialized object.

Tells this class to decode YAML by using a field as a discriminator.

Tells this class to decode YAML by using a field as a discriminator.

**Examples:**

Example 1 (json):
```json
require "yaml"

class Location
  include YAML::Serializable

  @[YAML::Field(key: "lat")]
  property latitude : Float64

  @[YAML::Field(key: "lng")]
  property longitude : Float64
end

class House
  include YAML::Serializable
  property address : String
  property location : Location?
end

house = House.from_yaml(%({"address": "Crystal Road 1234", "location": {"lat": 12.3, "lng": 34.5}}))
house.address  # => "Crystal Road 1234"
house.location # => #<Location:0x10cd93d80 @latitude=12.3, @longitude=34.5>
house.to_yaml  # => "---\naddress: Crystal Road 1234\nlocation:\n  lat: 12.3\n  lng: 34.5\n"

houses = Array(House).from_yaml("---\n- address: Crystal Road 1234\n  location:\n    lat: 12.3\n    lng: 34.5\n")
houses.size    # => 1
houses.to_yaml # => "---\n- address: Crystal Road 1234\n  location:\n    lat: 12.3\n    lng: 34.5\n"
```

Example 2 (php):
```php
require "yaml"

class A
  include YAML::Serializable

  @[YAML::Field(key: "my_key", emit_null: true)]
  getter a : Int32?
end
```

Example 3 (julia):
```julia
require "yaml"

struct A
  include YAML::Serializable
  @a : Int32
  @b : Float64 = 1.0
end

A.from_yaml("---\na: 1\n") # => A(@a=1, @b=1.0)
```

Example 4 (julia):
```julia
require "yaml"

struct A
  include YAML::Serializable
  include YAML::Serializable::Unmapped
  @a : Int32
end

a = A.from_yaml("---\na: 1\nb: 2\n") # => A(@yaml_unmapped={"b" => 2}, @a=1)
a.yaml_unmapped["b"].raw.class       # => Int64
a.to_yaml                            # => "---\na: 1\nb: 2\n"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Zip/File/Entry.html

**Contents:**
- class Compress::Zip::File::Entry
- Overview
- Included Modules
- Defined in:
- Instance Method Summary
  - Instance methods inherited from module Compress::Zip::FileInfo
  - Constructor methods inherited from module Compress::Zip::FileInfo
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

An entry inside a Zip::File.

Use the #open method to read from it.

Yields an IO to read this entry's contents.

Yields an IO to read this entry's contents. Multiple entries can be opened and read concurrently.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/MIME/MediaType.html

**Contents:**
- struct MIME::MediaType
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object

A MediaType describes a MIME content type with optional parameters.

Creates a new MediaType instance.

Parses a MIME type string representation including any optional parameters, per RFC 1521.

Parses a MIME type string representation including any optional parameters, per RFC 1521.

Returns the value for the parameter given by key.

Sets the value of parameter key to the given value.

Returns the value for the parameter given by key.

Calls the given block for each parameter and passes in the key and the value.

Returns an iterator over the parameter which behaves like an Iterator returning a Tuple of key and value.

Returns the value for the parameter given by key, or when not found the value given by default.

Returns the value for the parameter given by key, or when not found calls the given block with the key.

Second component of #media_type or nil.

Same as #inspect(io).

First component of #media_type.

Creates a new MediaType instance.

Parses a MIME type string representation including any optional parameters, per RFC 1521. Media types are the values in Content-Type and Content-Disposition HTTP headers (RFC 2183).

Media type is lowercased and trimmed of whitespace. Param keys are lowercased.

Raises MIME::Error on error.

Parses a MIME type string representation including any optional parameters, per RFC 1521. Media types are the values in Content-Type and Content-Disposition HTTP headers (RFC 2183).

Media type is lowercased and trimmed of whitespace. Param keys are lowercased.

Returns nil on error.

Returns the value for the parameter given by key. If not found, raises KeyError.

Sets the value of parameter key to the given value.

Returns the value for the parameter given by key. If not found, returns nil.

Calls the given block for each parameter and passes in the key and the value.

Returns an iterator over the parameter which behaves like an Iterator returning a Tuple of key and value.

Returns the value for the parameter given by key, or when not found the value given by default.

Returns the value for the parameter given by key, or when not found calls the given block with the key.

Second component of #media_type or nil.

Same as #inspect(io).

First component of #media_type.

**Examples:**

Example 1 (yaml):
```yaml
require "mime/media_type"

MIME::MediaType.parse("text/plain; charset=UTF-8")["charset"] # => "UTF-8"
MIME::MediaType.parse("text/plain; charset=UTF-8")["foo"]     # raises KeyError
```

Example 2 (javascript):
```javascript
require "mime/media_type"

mime_type = MIME::MediaType.parse("x-application/example")
mime_type["foo"] = "bar"
mime_type["foo"] # => "bar"
```

Example 3 (yaml):
```yaml
require "mime/media_type"

MIME::MediaType.parse("text/plain; charset=UTF-8")["charset"]? # => "UTF-8"
MIME::MediaType.parse("text/plain; charset=UTF-8")["foo"]?     # => nil
```

Example 4 (yaml):
```yaml
require "mime/media_type"

MIME::MediaType.parse("x-application/example").fetch("foo", "baz")          # => "baz"
MIME::MediaType.parse("x-application/example; foo=bar").fetch("foo", "baz") # => "bar"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/Client.html

**Contents:**
- class HTTP::Client
- Overview
  - One-shot usage
  - Parameters
  - Streaming
  - Reusing a connection
  - Compression
  - Encoding
- Defined in:
- Constant Summary

NOTE To use Client, you must explicitly import it with require "http/client"

Without a block, an HTTP::Client::Response is returned and the response's body is available as a String by invoking HTTP::Client::Response#body.

Parameters can be added to any request with the URI::Params.encode method, which converts a Hash or NamedTuple to a URL encoded HTTP query.

With a block, an HTTP::Client::Response body is returned and the response's body is available as an IO by invoking HTTP::Client::Response#body_io.

Similar to the above cases, but creating an instance of an HTTP::Client.

WARNING A single HTTP::Client instance is not safe for concurrent use by multiple fibers.

If compress isn't set to false, and no Accept-Encoding header is explicitly specified, an HTTP::Client will add an "Accept-Encoding": "gzip, deflate" header, and automatically decompress the response body/body_io.

If a response has a Content-Type header with a charset, that charset is set as the encoding of the returned IO (or used for creating a String for the body). Invalid bytes in the given encoding are silently ignored when reading text content.

Creates a new HTTP client with the given host, port and tls configurations.

Creates a new HTTP client bound to an existing IO.

Creates a new HTTP client from a URI.

Creates a new HTTP client from a URI, yields it to the block and closes the client afterwards.

Creates a new HTTP client, yields it to the block, and closes the client afterwards.

Executes a DELETE request.

Executes a DELETE request and yields the response to the block.

Executes a DELETE request with form data and returns a Response.

Executes a DELETE request with form data and yields the response to the block.

Executes a GET request.

Executes a GET request and yields the response to the block.

Executes a GET request with form data and returns a Response.

Executes a GET request with form data and yields the response to the block.

Executes a HEAD request.

Executes a HEAD request and yields the response to the block.

Executes a HEAD request with form data and returns a Response.

Executes a HEAD request with form data and yields the response to the block.

Executes a OPTIONS request.

Executes a OPTIONS request and yields the response to the block.

Executes a OPTIONS request with form data and returns a Response.

Executes a OPTIONS request with form data and yields the response to the block.

Executes a PATCH request.

Executes a PATCH request and yields the response to the block.

Executes a PATCH request with form data and returns a Response.

Executes a PATCH request with form data and yields the response to the block.

Executes a POST request.

Executes a POST request and yields the response to the block.

Executes a POST request with form data and returns a Response.

Executes a POST request with form data and yields the response to the block.

Executes a PUT request.

Executes a PUT request and yields the response to the block.

Executes a PUT request with form data and returns a Response.

Executes a PUT request with form data and yields the response to the block.

This macro allows injecting code to be run before and after the execution of the request.

Configures this client to perform basic authentication in every request.

Adds a callback to execute before each request.

Whether automatic compression/decompression is enabled.

Whether automatic compression/decompression is enabled.

Sets the number of seconds to wait when connecting, before raising an IO::TimeoutError.

DEPRECATED Use #connect_timeout=(Time::Span) instead

Sets the open timeout with a Time::Span to wait when connecting, before raising an IO::TimeoutError.

Executes a DELETE request.

Executes a DELETE request and yields the response to the block.

Executes a DELETE request with form data and returns a Response.

Executes a DELETE request with form data and yields the response to the block.

Executes a DELETE request with form data and returns a Response.

Executes a DELETE request with form data and yields the response to the block.

Sets the number of seconds to wait when resolving a name, before raising an IO::TimeoutError.

DEPRECATED Use #dns_timeout=(Time::Span) instead

Sets the number of seconds to wait when resolving a name with a Time::Span, before raising an IO::TimeoutError.

Executes a request and yields an HTTP::Client::Response to the block.

Executes a GET request.

Executes a GET request and yields the response to the block.

Executes a GET request with form data and returns a Response.

Executes a GET request with form data and yields the response to the block.

Executes a GET request with form data and returns a Response.

Executes a GET request with form data and yields the response to the block.

Executes a HEAD request.

Executes a HEAD request and yields the response to the block.

Executes a HEAD request with form data and returns a Response.

Executes a HEAD request with form data and yields the response to the block.

Executes a HEAD request with form data and returns a Response.

Executes a HEAD request with form data and yields the response to the block.

Returns the target host.

Executes a OPTIONS request.

Executes a OPTIONS request and yields the response to the block.

Executes a OPTIONS request with form data and returns a Response.

Executes a OPTIONS request with form data and yields the response to the block.

Executes a OPTIONS request with form data and returns a Response.

Executes a OPTIONS request with form data and yields the response to the block.

Executes a PATCH request.

Executes a PATCH request and yields the response to the block.

Executes a PATCH request with form data and returns a Response.

Executes a PATCH request with form data and yields the response to the block.

Executes a PATCH request with form data and returns a Response.

Executes a PATCH request with form data and yields the response to the block.

Returns the target port.

Executes a POST request.

Executes a POST request and yields the response to the block.

Executes a POST request with form data and returns a Response.

Executes a POST request with form data and yields the response to the block.

Executes a POST request with form data and returns a Response.

Executes a POST request with form data and yields the response to the block.

Executes a PUT request.

Executes a PUT request and yields the response to the block.

Executes a PUT request with form data and returns a Response.

Executes a PUT request with form data and yields the response to the block.

Executes a PUT request with form data and returns a Response.

Executes a PUT request with form data and yields the response to the block.

Sets the number of seconds to wait when reading before raising an IO::TimeoutError.

DEPRECATED Use #read_timeout=(Time::Span) instead

Sets the read timeout with a Time::Span, to wait when reading before raising an IO::TimeoutError.

Sets the write timeout - if any chunk of request is not written within the number of seconds provided, IO::TimeoutError exception is raised.

DEPRECATED Use #write_timeout=(Time::Span) instead

Sets the write timeout - if any chunk of request is not written within the provided Time::Span, IO::TimeoutError exception is raised.

Creates a new HTTP client with the given host, port and tls configurations. If no port is given, the default one will be used depending on the tls arguments: 80 for if tls is false, 443 if tls is truthy. If tls is true a new OpenSSL::SSL::Context::Client will be used, else the given one. In any case the active context can be accessed through #tls.

Creates a new HTTP client bound to an existing IO. host and port can be specified and they will be used to conform the Host header on each request. Instances created with this constructor cannot be reconnected. Once #close is called explicitly or if the connection doesn't support keep-alive, the next call to make a request will raise an exception.

Creates a new HTTP client from a URI. Parses the host, port, and tls configuration from the URI provided. Port defaults to 80 if not specified unless using the https protocol, which defaults to port 443 and sets tls to true.

This constructor will ignore any path or query segments in the URI as those will need to be passed to the client when a request is made.

If tls is given it will be used, if not a new TLS context will be created. If tls is given and uri is a HTTP URI, ArgumentError is raised. In any case the active context can be accessed through #tls.

This constructor will raise an exception if any scheme but HTTP or HTTPS is used.

Creates a new HTTP client from a URI, yields it to the block and closes the client afterwards. Parses the host, port, and tls configuration from the URI provided. Port defaults to 80 if not specified unless using the https protocol, which defaults to port 443 and sets tls to true.

This constructor will ignore any path or query segments in the URI as those will need to be passed to the client when a request is made.

If tls is given it will be used, if not a new TLS context will be created. If tls is given and uri is a HTTP URI, ArgumentError is raised. In any case the active context can be accessed through #tls.

This constructor will raise an exception if any scheme but HTTP or HTTPS is used.

Creates a new HTTP client, yields it to the block, and closes the client afterwards.

Executes a DELETE request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a DELETE request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a DELETE request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a DELETE request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a request. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a request. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a GET request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a GET request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a GET request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a GET request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a HEAD request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a HEAD request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a HEAD request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a HEAD request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a OPTIONS request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a OPTIONS request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a OPTIONS request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a OPTIONS request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PATCH request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a PATCH request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a PATCH request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PATCH request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a POST request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a POST request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a POST request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a POST request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PUT request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a PUT request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a PUT request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PUT request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

This macro allows injecting code to be run before and after the execution of the request. It should return the yielded value. It must be called with 1 block argument that will be used to pass the HTTP::Request.

Configures this client to perform basic authentication in every request.

Adds a callback to execute before each request. This is usually used to set an authorization header. Any number of callbacks can be added.

Closes this client. If used again, a new connection will be opened.

Whether automatic compression/decompression is enabled.

Whether automatic compression/decompression is enabled.

Sets the number of seconds to wait when connecting, before raising an IO::TimeoutError.

DEPRECATED Use #connect_timeout=(Time::Span) instead

Sets the open timeout with a Time::Span to wait when connecting, before raising an IO::TimeoutError.

Executes a DELETE request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a DELETE request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a DELETE request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a DELETE request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a DELETE request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a DELETE request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-type" header is set to "application/x-www-form-urlencoded".

Sets the number of seconds to wait when resolving a name, before raising an IO::TimeoutError.

NOTE dns_timeout is currently only supported on Windows.

DEPRECATED Use #dns_timeout=(Time::Span) instead

Sets the number of seconds to wait when resolving a name with a Time::Span, before raising an IO::TimeoutError.

NOTE dns_timeout is currently only supported on Windows.

Executes a request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a request. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a request and yields an HTTP::Client::Response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a GET request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a GET request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a GET request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a GET request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a GET request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a GET request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-type" header is set to "application/x-www-form-urlencoded".

Executes a HEAD request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a HEAD request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a HEAD request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a HEAD request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a HEAD request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a HEAD request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-type" header is set to "application/x-www-form-urlencoded".

Returns the target host.

Executes a OPTIONS request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a OPTIONS request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a OPTIONS request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a OPTIONS request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a OPTIONS request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a OPTIONS request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-type" header is set to "application/x-www-form-urlencoded".

Executes a PATCH request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a PATCH request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a PATCH request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PATCH request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PATCH request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PATCH request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-type" header is set to "application/x-www-form-urlencoded".

Returns the target port.

Executes a POST request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a POST request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a POST request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a POST request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a POST request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a POST request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-type" header is set to "application/x-www-form-urlencoded".

Executes a PUT request. The response will have its body as a String, accessed via HTTP::Client::Response#body.

Executes a PUT request and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io.

Executes a PUT request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PUT request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PUT request with form data and returns a Response. The "Content-Type" header is set to "application/x-www-form-urlencoded".

Executes a PUT request with form data and yields the response to the block. The response will have its body as an IO accessed via HTTP::Client::Response#body_io. The "Content-type" header is set to "application/x-www-form-urlencoded".

Sets the number of seconds to wait when reading before raising an IO::TimeoutError.

DEPRECATED Use #read_timeout=(Time::Span) instead

Sets the read timeout with a Time::Span, to wait when reading before raising an IO::TimeoutError.

Sets the write timeout - if any chunk of request is not written within the number of seconds provided, IO::TimeoutError exception is raised.

DEPRECATED Use #write_timeout=(Time::Span) instead

Sets the write timeout - if any chunk of request is not written within the provided Time::Span, IO::TimeoutError exception is raised.

**Examples:**

Example 1 (html):
```html
require "http/client"

response = HTTP::Client.get "http://www.example.com"
response.status_code      # => 200
response.body.lines.first # => "<!doctype html>"
```

Example 2 (javascript):
```javascript
require "http/client"

params = URI::Params.encode({"author" => "John Doe", "offset" => "20"}) # => "author=John+Doe&offset=20"
response = HTTP::Client.get URI.new("http", "www.example.com", query: params)
response.status_code # => 200
```

Example 3 (html):
```html
require "http/client"

HTTP::Client.get("http://www.example.com") do |response|
  response.status_code  # => 200
  response.body_io.gets # => "<!doctype html>"
end
```

Example 4 (html):
```html
require "http/client"

client = HTTP::Client.new "www.example.com"
response = client.get "/"
response.status_code      # => 200
response.body.lines.first # => "<!doctype html>"
client.close
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/URI/Params/Builder.html

**Contents:**
- class URI::Params::Builder
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Every parameter added is directly written to an IO, where keys and values are properly escaped.

Initializes this builder to write to the given io.

Adds a key-value pair to the params being built.

Adds all of the given values as key-value pairs to the params being built.

Initializes this builder to write to the given io. space_to_plus controls how spaces are encoded:

Adds a key-value pair to the params being built.

Adds all of the given values as key-value pairs to the params being built.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/URI/Params/Serializable.html

**Contents:**
- module URI::Params::Serializable
- Overview
  - Example
  - Usage
- Defined in:
- Instance Method Summary
- Instance Method Detail

The URI::Params::Serializable module automatically generates methods for x-www-form-urlencoded serialization when included.

NOTE To use this module, you must explicitly import it with require "uri/params/serializable".

Including URI::Params::Serializable will create #to_www_form and self.from_www_form methods on the current class. By default, these methods serialize into a www form encoded string containing the value of every instance variable, the keys being the instance variable name. Union types are also supported, including unions with nil. If multiple types in a union parse correctly, it is undefined which one will be chosen.

To change how individual instance variables are parsed, the annotation URI::Params::Field can be placed on the instance variable. Annotating property, getter and setter macros is also allowed.

URI::Params::Field properties:

Deserialization also respects default values of variables:

NOTE URI::Params::Serializable defines an internal constructor on any including type, which means the default constructor (def initialize; end) is absent unless explicitly defined by the user, even when all instance variables have a default initializer.

**Examples:**

Example 1 (julia):
```julia
require "uri/params/serializable"

struct Applicant
  include URI::Params::Serializable

  getter first_name : String
  getter last_name : String
  getter qualities : Array(String)
end

applicant = Applicant.from_www_form "first_name=John&last_name=Doe&qualities=kind&qualities=smart"
applicant.first_name  # => "John"
applicant.last_name   # => "Doe"
applicant.qualities   # => ["kind", "smart"]
applicant.to_www_form # => "first_name=John&last_name=Doe&qualities=kind&qualities=smart"
```

Example 2 (julia):
```julia
require "uri/params/serializable"

struct A
  include URI::Params::Serializable

  @a : Int32
  @b : Float64 = 1.0
end

A.from_www_form("a=1") # => A(@a=1, @b=1.0)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Unicode.html

**Contents:**
- module Unicode
- Overview
- Defined in:
- Constant Summary
- Class Method Summary
- Class Method Detail

Provides the Unicode::CaseOptions enum for special case conversions like Turkic.

The currently supported Unicode version.

---

## Class methods¶

**URL:** https://crystal-lang.org/reference/1.18/syntax_and_semantics/class_methods.html

**Contents:**
- Class methods¶
- Constructors¶

Class methods are methods associated to a class or module instead of a specific instance.

Class methods are defined by prefixing the method name with the type name and a period.

When they're defined inside a class or module scope it is easier to use self instead of the class name.

Class methods can also be defined by extending a Module.

A class method can be called under the same name as it was defined (CaesarCipher.decrypt("HELLO")). When called from within the same class or module scope the receiver can be self or implicit (like encrypt(string)).

A class method is not in scope within an instance of the class; instead, access it through the class scope.

Constructors are normal class methods which create a new instance of the class. By default all classes in Crystal have at least one constructor called new, but they may also define other constructors with different names.

**Examples:**

Example 1 (swift):
```swift
module CaesarCipher
  def self.encrypt(string : String)
    string.chars.map { |char| ((char.upcase.ord - 52) % 26 + 65).chr }.join
  end
end

CaesarCipher.encrypt("HELLO") # => "URYYB"
```

Example 2 (julia):
```julia
def CaesarCipher.decrypt(string : String)
  encrypt(string)
end
```

Example 3 (swift):
```swift
class Foo
  def self.shout(str : String)
    puts str.upcase
  end

  def baz
    self.class.shout("baz")
  end
end

Foo.new.baz # => BAZ
```

---

## Writing Shards¶

**URL:** https://crystal-lang.org/reference/1.18/guides/writing_shards.html

**Contents:**
- Writing Shards¶
- What's a Shard?¶
- Introduction¶
  - Requirements¶
  - Creating the Project¶
  - Writing the Code¶
    - Testing the Code¶
    - Documentation¶
  - Writing a README¶
    - Coding Style¶

How to write and release Crystal Shards.

Simply put, a Shard is a package of Crystal code, made to be shared-with and used-by other projects.

See the Shards command for details.

In this tutorial, we'll be making a Crystal library called palindrome-example.

For those who don't know, a palindrome is a word which is spelled the same way forwards as it is backwards. e.g. racecar, mom, dad, kayak, madam

In order to release a Crystal Shard, and follow along with this tutorial, you will need the following:

Begin by using the Crystal compiler's init lib command to create a Crystal library with the standard directory structure.

In your terminal: crystal init lib <YOUR-SHARD-NAME>

...and cd into the directory:

Then add & commit to start tracking the files with Git:

The code you write is up to you, but how you write it impacts whether people want to use your library and/or help you maintain it.

Run crystal docs to convert your code and comments into interlinking API documentation. Open the files in the /docs/ directory with a web browser to see how your documentation is looking along the way.

See below for instructions on hosting your compiler-generated docs on GitHub/GitLab Pages.

Once your documentation is ready and available, you can add a documentation badge to your repository so users know that it exists. In GitLab this badge belongs to the project so we'll cover it in the GitLab instructions below, for GitHub it is common to place it below the description in your README.md like so: (Be sure to replace <LINK-TO-YOUR-DOCUMENTATION> accordingly)

A good README can make or break your project. Awesome README is a nice curation of examples and resources on the topic.

Most importantly, your README should explain:

This explanation should include a few examples along with subheadings.

Be sure to replace all instances of [your-github-name] in the Crystal-generated README template with your GitHub/GitLab username. If you're using GitLab, you'll also want to change all instances of github with gitlab.

To check if your code is formatted correctly, or to check if using the formatter wouldn't produce any changes, simply add --check to the end of this command.

This check is good to add as a step in continuous integration.

The spec is your rulebook. Follow it.

Your shard.yml's name property should be concise and descriptive.

Add a description to your shard.yml.

A description is a single line description used to search for and find your shard.

A description should be:

It's hard for anyone to use your project if they can't find it. There are several services for discovering shards, a list is available on the Crystal Community page.

There are people looking for the exact functionality of our library and the general functionality of our library. e.g. Bob needs a palindrome library, but Felipe is just looking for libraries involving text and Susan is looking for libraries involving spelling.

Our name is already descriptive enough for Bob's search of "palindrome". We don't need to repeat the palindrome keyword. Instead, we'll catch Susan's search for "spelling" and Felipe's search for "text".

From here the guide differs depending on whether you are hosting your repo on GitHub or GitLab. If you're hosting somewhere else, please feel free to write up a guide and add it to this book!

**Examples:**

Example 1 (unknown):
```unknown
$ crystal init lib palindrome-example
    create  palindrome-example/.gitignore
    create  palindrome-example/.editorconfig
    create  palindrome-example/LICENSE
    create  palindrome-example/README.md
    create  palindrome-example/shard.yml
    create  palindrome-example/src/palindrome-example.cr
    create  palindrome-example/spec/spec_helper.cr
    create  palindrome-example/spec/palindrome-example_spec.cr
Initialized empty Git repository in /<YOUR-DIRECTORY>/.../palindrome-example/.git/
```

Example 2 (unknown):
```unknown
cd palindrome-example
```

Example 3 (json):
```json
$ git add -A
$ git commit -am "First Commit"
[master (root-commit) 77bad84] First Commit
 8 files changed, 104 insertions(+)
 create mode 100644 .editorconfig
 create mode 100644 .gitignore
 create mode 100644 LICENSE
 create mode 100644 README.md
 create mode 100644 shard.yml
 create mode 100644 spec/palindrome-example_spec.cr
 create mode 100644 spec/spec_helper.cr
 create mode 100644 src/palindrome-example.cr
```

Example 4 (json):
```json
[![Docs](https://img.shields.io/badge/docs-available-brightgreen.svg)](<LINK-TO-YOUR-DOCUMENTATION>)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Deprecated.html

**Contents:**
- annotation Deprecated
- Overview
- Defined in:

def foo(bar, @[Deprecated("Do not try this at home")] baz) end

**Examples:**

Example 1 (php):
```php
Deprecations are shown in the API docs and the compiler prints a warning when
using a deprecated feature.

Deprecated types only trigger a warning when they are actually _used_ (e.g.
calling a class method), not when they're just part of type restriction, for
example.
Deprecated parameters only trigger a warning when the particular parameter is
passed in a call. Calls without this parameter are unaffected.
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/Dispatcher.html

**Contents:**
- module Log::Dispatcher
- Overview
- Direct including types
- Defined in:
- Instance Method Summary
- Instance Method Detail

Base interface implemented by log entry dispatchers

Dispatchers are in charge of sending log entries according to different strategies.

Close the dispatcher, releasing resources

Dispatch a log entry to the specified backend

Close the dispatcher, releasing resources

Dispatch a log entry to the specified backend

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/File/MatchOptions.html

**Contents:**
- enum File::MatchOptions
- Overview
- Defined in:
- Enum Members
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum

Options used to control the behavior of Dir.glob.

Includes files whose name begins with a period (.).

Includes files which have a hidden attribute backed by the native filesystem.

On Windows, this matches files that have the NTFS hidden attribute set. This option alone doesn't match files with both the hidden and the system attributes, OSHidden must also be used.

On other systems, this has no effect.

Includes files which are considered hidden by operating system conventions (apart from DotFiles), but not by the filesystem.

On Windows, this option alone has no effect. However, combining it with NativeHidden matches files that have both the NTFS hidden and system attributes set. Note that files with just the system attribute, but not the hidden attribute, are always matched regardless of this option or NativeHidden.

On other systems, this has no effect.

Returns a suitable platform-specific default set of options for Dir.glob and Dir.[].

Returns true if this enum value contains DotFiles

Returns true if this enum value contains NativeHidden

Returns true if this enum value contains OSHidden

Returns a suitable platform-specific default set of options for Dir.glob and Dir.[].

Currently this is always NativeHidden | OSHidden.

Returns true if this enum value contains DotFiles

Returns true if this enum value contains NativeHidden

Returns true if this enum value contains OSHidden

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Benchmark/IPS/Entry.html

**Contents:**
- class Benchmark::IPS::Entry
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Code to be benchmarked

Code to be benchmarked

Number of bytes allocated per operation

Number of bytes allocated per operation

Number of bytes allocated per operation

Number of cycles needed to run #action for approximately 100ms.

Number of cycles needed to run #action for approximately 100ms.

Number of cycles needed to run #action for approximately 100ms.

Label of the benchmark

Label of the benchmark

Statistical mean from calculation stage

Statistical mean from calculation stage

Statistical mean from calculation stage

Relative standard deviation as a percentage

Relative standard deviation as a percentage

Relative standard deviation as a percentage

Number of 100ms runs during the calculation stage

Number of 100ms runs during the calculation stage

Number of 100ms runs during the calculation stage

Multiple slower than the fastest entry

Multiple slower than the fastest entry

Multiple slower than the fastest entry

Statistical standard deviation from calculation stage

Statistical standard deviation from calculation stage

Statistical standard deviation from calculation stage

Statistical variance from calculation stage

Statistical variance from calculation stage

Statistical variance from calculation stage

Code to be benchmarked

Code to be benchmarked

Number of bytes allocated per operation

Number of bytes allocated per operation

Number of bytes allocated per operation

Number of cycles needed to run #action for approximately 100ms. Calculated during the warmup stage

Number of cycles needed to run #action for approximately 100ms. Calculated during the warmup stage

Number of cycles needed to run #action for approximately 100ms. Calculated during the warmup stage

Label of the benchmark

Label of the benchmark

Statistical mean from calculation stage

Statistical mean from calculation stage

Statistical mean from calculation stage

Relative standard deviation as a percentage

Relative standard deviation as a percentage

Relative standard deviation as a percentage

Number of 100ms runs during the calculation stage

Number of 100ms runs during the calculation stage

Number of 100ms runs during the calculation stage

Multiple slower than the fastest entry

Multiple slower than the fastest entry

Multiple slower than the fastest entry

Statistical standard deviation from calculation stage

Statistical standard deviation from calculation stage

Statistical standard deviation from calculation stage

Statistical variance from calculation stage

Statistical variance from calculation stage

Statistical variance from calculation stage

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/File/Permissions.html

**Contents:**
- enum File::Permissions
- Overview
- Defined in:
- Enum Members
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum

Represents a set of access permissions for a file. Not all permission sets will be supported on all platforms.

The binary representation of this enum is defined to be same representation as the permission bits of a unix st_mode field. File::Permissions can also be compared to its underlying bitset, for example File::Permissions::All == 0o777 will always be true.

On windows, only the OwnerWrite bit is effective. All file permissions will either be 0o444 for read-only files or 0o666 for read-write files. Directories are always mode 0o555 for read-only or 0o777.

Returns true if this enum value contains GroupAll

Returns true if this enum value contains GroupExecute

Returns true if this enum value contains GroupRead

Returns true if this enum value contains GroupWrite

Returns true if this enum value contains OtherAll

Returns true if this enum value contains OtherExecute

Returns true if this enum value contains OtherRead

Returns true if this enum value contains OtherWrite

Returns true if this enum value contains OwnerAll

Returns true if this enum value contains OwnerExecute

Returns true if this enum value contains OwnerRead

Returns true if this enum value contains OwnerWrite

Appends a String representation of this enum member to the given io.

Returns true if this enum value contains GroupAll

Returns true if this enum value contains GroupExecute

Returns true if this enum value contains GroupRead

Returns true if this enum value contains GroupWrite

Returns true if this enum value contains OtherAll

Returns true if this enum value contains OtherExecute

Returns true if this enum value contains OtherRead

Returns true if this enum value contains OtherWrite

Returns true if this enum value contains OwnerAll

Returns true if this enum value contains OwnerExecute

Returns true if this enum value contains OwnerRead

Returns true if this enum value contains OwnerWrite

Appends a String representation of this enum member to the given io.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/EpochConverter.html

**Contents:**
- module Time::EpochConverter
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

Converter to be used with JSON::Serializable and YAML::Serializable to serialize a Time instance as the number of seconds since the unix epoch. See Time#to_unix.

**Examples:**

Example 1 (json):
```json
require "json"

class Person
  include JSON::Serializable

  @[JSON::Field(converter: Time::EpochConverter)]
  property birth_date : Time
end

person = Person.from_json(%({"birth_date": 1459859781}))
person.birth_date # => 2016-04-05 12:36:21Z
person.to_json    # => %({"birth_date":1459859781})
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Crystal/SyntaxHighlighter/Colorize.html

**Contents:**
- class Crystal::SyntaxHighlighter::Colorize
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Crystal::SyntaxHighlighter
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

A syntax highlighter that renders Crystal source code with ANSI escape codes suitable for terminal highlighting.

NOTE To use Crystal::SyntaxHighlighter::Colorize, you must explicitly import it with require "crystal/syntax_highlighter/colorize"

Creates a new instance of a Colorize syntax highlighter.

Highlights code and writes the result to io.

Highlights code and returns the result.

Highlights code or returns unhighlighted code on error.

Renders token with text value.

Renders a delimiter sequence.

Renders an interpolation sequence.

Renders a string array sequence.

Creates a new instance of a Colorize syntax highlighter.

Appends highlighted output (when calling #highlight) to io.

Highlights code and writes the result to io.

Highlights code and returns the result.

Highlights code or returns unhighlighted code on error.

Same as .highlight(code : String) except that any error is rescued and returns unhighlighted source code.

Renders token with text value.

Renders a delimiter sequence.

Renders an interpolation sequence.

Renders a string array sequence.

**Examples:**

Example 1 (javascript):
```javascript
require "crystal/syntax_highlighter/colorize"

code = %(foo = bar("baz\#{PI + 1}") # comment)
colorized = Crystal::SyntaxHighlighter::Colorize.highlight(code)
colorized # => "foo \e[91m=\e[0m bar(\e[93m\"baz\#{\e[0;36mPI\e[0;93m \e[0;91m+\e[0;93m \e[0;35m1\e[0;93m}\"\e[0m) \e[90m# comment\e[0m"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Regex/Options.html

**Contents:**
- enum Regex::Options
- Overview
- Defined in:
- Enum Members
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum
  - Instance methods inherited from module Comparable(Enum)

Represents compile options passed to Regex.new.

This type is intended to be renamed to CompileOptions. Please use that name.

Case insensitive match.

Equivalent to MULTILINE | DOTALL in PCRE and PCRE2.

Equivalent to MULTILINE in PCRE and PCRE2.

Ignore white space and # comments.

Force pattern anchoring at the start of the subject.

Force pattern anchoring at the end of the subject.

Unsupported with PCRE.

Do not check the pattern for valid UTF encoding.

This option is potentially dangerous and must only be used when the pattern is guaranteed to be valid (e.g. String#valid_encoding?). Failing to do so can lead to undefined behaviour in the regex library and may crash the entire process.

NOTE String is supposed to be valid UTF-8, but this is not guaranteed or enforced. Especially data originating from external sources should not be trusted.

UTF validation is comparatively expensive, so skipping it can produce a significant performance improvement.

The standard library implicitly applies this option when it can be sure about the patterns's validity (e.g. on repeated matches in String#gsub).

Enable matching against subjects containing invalid UTF bytes. Invalid bytes never match anything. The entire subject string is effectively split into segments of valid UTF.

Read more in the PCRE2 documentation.

When this option is set, MatchOptions::NO_UTF_CHECK is ignored at match time.

Unsupported with PCRE.

NOTE This option was introduced in PCRE2 10.34 but a bug that can lead to an infinite loop is only fixed in 10.36 (https://github.com/PCRE2Project/pcre2/commit/e0c6029a62db9c2161941ecdf459205382d4d379).

Returns true if this enum value contains ANCHORED

Returns true if this enum value contains DOLLAR_ENDONLY

Returns true if this enum value contains DOTALL

Returns true if this enum value contains ENDANCHORED

Returns true if this enum value contains EXTENDED

Returns true if this enum value contains FIRSTLINE

Returns true if this enum value contains IGNORE_CASE

Returns true if this enum value contains MATCH_INVALID_UTF

Returns true if this enum value contains MULTILINE

Returns true if this enum value contains MULTILINE_ONLY

Returns true if this enum value contains NO_UTF_CHECK

Returns true if this enum value contains ANCHORED

Returns true if this enum value contains DOLLAR_ENDONLY

Returns true if this enum value contains DOTALL

Returns true if this enum value contains ENDANCHORED

Returns true if this enum value contains EXTENDED

Returns true if this enum value contains FIRSTLINE

Returns true if this enum value contains IGNORE_CASE

Returns true if this enum value contains MATCH_INVALID_UTF

Returns true if this enum value contains MULTILINE

Returns true if this enum value contains MULTILINE_ONLY

Returns true if this enum value contains NO_UTF_CHECK

**Examples:**

Example 1 (julia):
```julia
pattern = "fo+"
if pattern.valid_encoding?
  regex = Regex.new(pattern, options: Regex::CompileOptions::NO_UTF_CHECK)
  regex.match(foo)
else
  raise "Invalid UTF in regex pattern"
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Fiber.html

**Contents:**
- class Fiber
- Overview
- Cooperative
- Event loop
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference

A Fiber is a light-weight execution unit managed by the Crystal runtime.

It is conceptually similar to an operating system thread but with less overhead and completely internal to the Crystal process. The runtime includes a scheduler which schedules execution of fibers.

A Fiber has a stack size of 8 MiB which is usually also assigned to an operating system thread. But only 4KiB are actually allocated at first so the memory footprint is very small.

Communication between fibers is usually passed through Channel.

Fibers are cooperative. That means execution can only be drawn from a fiber when it offers it. It can't be interrupted in its execution at random. In order to make concurrency work, fibers must make sure to occasionally provide hooks for the scheduler to swap in other fibers. IO operations like reading from a file descriptor are natural implementations for this and the developer does not need to take further action on that. When IO access can't be served immediately by a buffer, the fiber will automatically wait and yield execution. When IO is ready it's going to be resumed through the event loop.

When a computation-intensive task has none or only rare IO operations, a fiber should explicitly offer to yield execution from time to time using Fiber.yield to break up tight loops. The frequency of this call depends on the application and concurrency model.

The event loop is responsible for keeping track of sleeping fibers waiting for notifications that IO is ready or a timeout reached. When a fiber can be woken, the event loop enqueues it in the scheduler

Returns the current fiber.

Creates a new Fiber instance.

Suspends execution of the current fiber indefinitely.

Yields to the scheduler and allows it to swap execution to other waiting fibers.

The fiber's proc has terminated, and the fiber is now considered dead.

Adds this fiber to the scheduler's runnables queue for the current thread.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

The name of the fiber, used as internal reference.

The name of the fiber, used as internal reference.

The fiber's proc is currently not running and fully saved its context.

Immediately resumes execution of this fiber.

The fiber's proc is currently running or didn't fully save its context.

Appends a short String representation of this object which includes its class name and its object address.

Returns the current fiber.

Creates a new Fiber instance.

When the fiber is executed, it runs proc in its context.

name is an optional and used only as an internal reference.

Suspends execution of the current fiber indefinitely.

Unlike Fiber.yield the current fiber is not automatically reenqueued and can only be resumed with an explicit call to #enqueue.

This is equivalent to sleep without a time.

This method is meant to be used in concurrency primitives. It's particularly useful if the fiber needs to wait for something to happen (for example an IO event, a message is ready in a channel, etc.) which triggers a re-enqueue.

Yields to the scheduler and allows it to swap execution to other waiting fibers.

This is equivalent to sleep 0.seconds. It gives the scheduler an option to interrupt the current fiber's execution. If no other fibers are ready to be resumed, it immediately resumes the current fiber.

This method is particularly useful to break up tight loops which are only computation intensive and don't offer natural opportunities for swapping fibers as with IO operations.

The fiber's proc has terminated, and the fiber is now considered dead. The fiber is impossible to resume, ever.

Adds this fiber to the scheduler's runnables queue for the current thread.

This signals to the scheduler that the fiber is eligible for being resumed the next time it has the opportunity to reschedule to another fiber. There are no guarantees when that will happen.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

The name of the fiber, used as internal reference.

The name of the fiber, used as internal reference.

The fiber's proc is currently not running and fully saved its context. The fiber can be resumed safely.

Immediately resumes execution of this fiber.

There are no provisions for resuming the current fiber (where this method is called). Unless it is explicitly added for rescheduling (for example using #enqueue) the current fiber won't ever reach any instructions after the call to this method.

The fiber's proc is currently running or didn't fully save its context. The fiber can't be resumed.

Appends a short String representation of this object which includes its class name and its object address.

**Examples:**

Example 1 (julia):
```julia
counter = 0
spawn name: "status" do
  loop do
    puts "Status: #{counter}"
    sleep(2.seconds)
  end
end

while counter < Int32::MAX
  counter += 1
  if counter % 1_000_000 == 0
    # Without this, there would never be an opportunity to resume the status fiber
    Fiber.yield
  end
end
```

Example 2 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).inspect # => #<Person:0x10fd31f20 @name="John", @age=32>
```

Example 3 (julia):
```julia
fiber = Fiber.new do
  puts "in fiber"
end
fiber.resume
puts "never reached"
```

Example 4 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).to_s # => #<Person:0x10a199f20>
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/CSV/Builder/Row.html

**Contents:**
- struct CSV::Builder::Row
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

A CSV Row being built.

Appends the given value to this row.

Appends the given value to this row.

Appends the given value to this row.

Appends the given values to this row.

Appends the given values to this row.

Appends a comma, thus skipping a cell.

Appends the given value to this row.

Appends the given value to this row.

Appends the given value to this row.

Appends the given values to this row.

Appends the given values to this row.

Appends a comma, thus skipping a cell.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Math.html

**Contents:**
- module Math
- Extended Modules
- Defined in:
- Constant Summary
- Instance Method Summary
- Instance Method Detail

Archimedes' constant (π).

The full circle constant (τ), equal to 2π.

Calculates the arc cosine of value.

Calculates the arc cosine of value.

Calculates the arc cosine of value.

Calculates the inverse hyperbolic cosine of value.

Calculates the inverse hyperbolic cosine of value.

Calculates the inverse hyperbolic cosine of value.

Calculates the arc sine of value.

Calculates the arc sine of value.

Calculates the arc sine of value.

Calculates the inverse hyperbolic sine of value.

Calculates the inverse hyperbolic sine of value.

Calculates the inverse hyperbolic sine of value.

Calculates the arc tangent of value.

Calculates the arc tangent of value.

Calculates the arc tangent of value.

Calculates the two-argument arc tangent of the ray from (0, 0) to (x, y).

Calculates the two-argument arc tangent of the ray from (0, 0) to (x, y).

Calculates the two-argument arc tangent of the ray from (0, 0) to (x, y).

Calculates the inverse hyperbolic tangent of value.

Calculates the inverse hyperbolic tangent of value.

Calculates the inverse hyperbolic tangent of value.

Calculates the cylindrical Bessel function of the first kind of value for the given order.

Calculates the cylindrical Bessel function of the first kind of value for the given order.

Calculates the cylindrical Bessel function of the first kind of value for the given order.

Calculates the cylindrical Bessel function of the first kind of value for order 0.

Calculates the cylindrical Bessel function of the first kind of value for order 0.

Calculates the cylindrical Bessel function of the first kind of value for order 0.

Calculates the cylindrical Bessel function of the first kind of value for order 1.

Calculates the cylindrical Bessel function of the first kind of value for order 1.

Calculates the cylindrical Bessel function of the first kind of value for order 1.

Calculates the cylindrical Bessel function of the second kind of value for the given order.

Calculates the cylindrical Bessel function of the second kind of value for the given order.

Calculates the cylindrical Bessel function of the second kind of value for the given order.

Calculates the cylindrical Bessel function of the second kind of value for order 0.

Calculates the cylindrical Bessel function of the second kind of value for order 0.

Calculates the cylindrical Bessel function of the second kind of value for order 0.

Calculates the cylindrical Bessel function of the second kind of value for order 1.

Calculates the cylindrical Bessel function of the second kind of value for order 1.

Calculates the cylindrical Bessel function of the second kind of value for order 1.

Calculates the cubic root of value.

Calculates the cubic root of value.

Calculates the cubic root of value.

Returns the floating-point value with the magnitude of value1 and the sign of value2.

Returns the floating-point value with the magnitude of value1 and the sign of value2.

Returns the floating-point value with the magnitude of value1 and the sign of value2.

Returns the floating-point value with the magnitude of value1 and the sign of value2.

Calculates the cosine of value, measured in radians.

Calculates the cosine of value, measured in radians.

Calculates the cosine of value, measured in radians.

Calculates the hyperbolic cosine of value.

Calculates the hyperbolic cosine of value.

Calculates the hyperbolic cosine of value.

Calculates the error function of value.

Calculates the error function of value.

Calculates the error function of value.

Calculates 1 minus the error function of value.

Calculates 1 minus the error function of value.

Calculates 1 minus the error function of value.

Calculates the exponential of value.

Calculates the exponential of value.

Calculates the exponential of value.

Calculates the exponential of value.

Calculates 2 raised to the power value.

Calculates 2 raised to the power value.

Calculates 2 raised to the power value.

Calculates the exponential of value, minus 1.

Calculates the exponential of value, minus 1.

Calculates the exponential of value, minus 1.

Fused multiply-add; returns value1 * value2 + value3, performing a single rounding instead of two.

Fused multiply-add; returns value1 * value2 + value3, performing a single rounding instead of two.

Fused multiply-add; returns value1 * value2 + value3, performing a single rounding instead of two.

Decomposes the given floating-point value into a normalized fraction and an integral power of two.

Decomposes the given floating-point value into a normalized fraction and an integral power of two.

Decomposes the given floating-point value into a normalized fraction and an integral power of two.

Decomposes the given floating-point value into a normalized fraction and an integral power of two.

Calculates the gamma function of value.

Calculates the gamma function of value.

Calculates the gamma function of value.

Calculates the length of the hypotenuse from (0, 0) to (value1, value2).

Calculates the length of the hypotenuse from (0, 0) to (value1, value2).

Calculates the length of the hypotenuse from (0, 0) to (value1, value2).

Returns the unbiased base 2 exponent of the given floating-point value.

Returns the unbiased base 2 exponent of the given floating-point value.

Returns the unbiased base 2 exponent of the given floating-point value.

Returns the unbiased base 2 exponent of the given floating-point value.

Calculates the integer square root of value.

Calculates the integer square root of value.

Multiplies the given floating-point value by 2 raised to the power exp.

Multiplies the given floating-point value by 2 raised to the power exp.

Multiplies the given floating-point value by 2 raised to the power exp.

Multiplies the given floating-point value by 2 raised to the power exp.

Calculates the logarithmic gamma of value.

Calculates the logarithmic gamma of value.

Calculates the logarithmic gamma of value.

Calculates the logarithm of value to the given base.

Calculates the natural logarithm of value.

Calculates the natural logarithm of value.

Calculates the natural logarithm of value.

Calculates the natural logarithm of value.

Calculates the logarithm of value to base 10.

Calculates the logarithm of value to base 10.

Calculates the logarithm of value to base 10.

Calculates the logarithm of value to base 10.

Calculates the natural logarithm of 1 plus value.

Calculates the natural logarithm of 1 plus value.

Calculates the natural logarithm of 1 plus value.

Calculates the logarithm of value to base 2.

Calculates the logarithm of value to base 2.

Calculates the logarithm of value to base 2.

Calculates the logarithm of value to base 2.

Returns the unbiased radix-independent exponent of the given floating-point value.

Returns the unbiased radix-independent exponent of the given floating-point value.

Returns the unbiased radix-independent exponent of the given floating-point value.

Returns the unbiased radix-independent exponent of the given floating-point value.

Returns the greater of value1 and value2.

Returns the greater of value1 and value2.

Returns the greater of value1 and value2.

Returns the smaller of value1 and value2.

Returns the smaller of value1 and value2.

Returns the smaller of value1 and value2.

Computes the smallest nonnegative power of 2 that is greater than or equal to v.

Computes the smallest nonnegative power of 2 that is greater than or equal to v.

Returns the floating-point value with its exponent raised by exp.

Returns the floating-point value with its exponent raised by exp.

Returns the floating-point value with its exponent raised by exp.

Returns the floating-point value with its exponent raised by exp.

Returns the floating-point value with its exponent raised by exp.

Returns the floating-point value with its exponent raised by exp.

Returns the floating-point value with its exponent raised by exp.

Returns the floating-point value with its exponent raised by exp.

Calculates the sine of value, measured in radians.

Calculates the sine of value, measured in radians.

Calculates the sine of value, measured in radians.

Calculates the hyperbolic sine of value.

Calculates the hyperbolic sine of value.

Calculates the hyperbolic sine of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the tangent of value, measured in radians.

Calculates the tangent of value, measured in radians.

Calculates the tangent of value, measured in radians.

Calculates the hyperbolic tangent of value.

Calculates the hyperbolic tangent of value.

Calculates the hyperbolic tangent of value.

Calculates the arc cosine of value.

Calculates the arc cosine of value.

Calculates the arc cosine of value.

Calculates the inverse hyperbolic cosine of value.

Calculates the inverse hyperbolic cosine of value.

Calculates the inverse hyperbolic cosine of value.

Calculates the arc sine of value.

Calculates the arc sine of value.

Calculates the arc sine of value.

Calculates the inverse hyperbolic sine of value.

Calculates the inverse hyperbolic sine of value.

Calculates the inverse hyperbolic sine of value.

Calculates the arc tangent of value.

Calculates the arc tangent of value.

Calculates the arc tangent of value.

Calculates the two-argument arc tangent of the ray from (0, 0) to (x, y).

Calculates the two-argument arc tangent of the ray from (0, 0) to (x, y).

Calculates the two-argument arc tangent of the ray from (0, 0) to (x, y).

Calculates the inverse hyperbolic tangent of value.

Calculates the inverse hyperbolic tangent of value.

Calculates the inverse hyperbolic tangent of value.

Calculates the cylindrical Bessel function of the first kind of value for the given order.

Calculates the cylindrical Bessel function of the first kind of value for the given order.

Calculates the cylindrical Bessel function of the first kind of value for the given order.

Calculates the cylindrical Bessel function of the first kind of value for order 0.

Calculates the cylindrical Bessel function of the first kind of value for order 0.

Calculates the cylindrical Bessel function of the first kind of value for order 0.

Calculates the cylindrical Bessel function of the first kind of value for order 1.

Calculates the cylindrical Bessel function of the first kind of value for order 1.

Calculates the cylindrical Bessel function of the first kind of value for order 1.

Calculates the cylindrical Bessel function of the second kind of value for the given order.

Calculates the cylindrical Bessel function of the second kind of value for the given order.

Calculates the cylindrical Bessel function of the second kind of value for the given order.

Calculates the cylindrical Bessel function of the second kind of value for order 0.

Calculates the cylindrical Bessel function of the second kind of value for order 0.

Calculates the cylindrical Bessel function of the second kind of value for order 0.

Calculates the cylindrical Bessel function of the second kind of value for order 1.

Calculates the cylindrical Bessel function of the second kind of value for order 1.

Calculates the cylindrical Bessel function of the second kind of value for order 1.

Calculates the cubic root of value.

Calculates the cubic root of value.

Calculates the cubic root of value.

Returns the floating-point value with the magnitude of value1 and the sign of value2.

Returns the floating-point value with the magnitude of value1 and the sign of value2.

Returns the floating-point value with the magnitude of value1 and the sign of value2.

BigFloat does not support signed zeros; if value2 == 0, the returned value is non-negative.

Returns the floating-point value with the magnitude of value1 and the sign of value2.

Calculates the cosine of value, measured in radians.

Calculates the cosine of value, measured in radians.

Calculates the cosine of value, measured in radians.

Calculates the hyperbolic cosine of value.

Calculates the hyperbolic cosine of value.

Calculates the hyperbolic cosine of value.

Calculates the error function of value.

Calculates the error function of value.

Calculates the error function of value.

Calculates 1 minus the error function of value.

Calculates 1 minus the error function of value.

Calculates 1 minus the error function of value.

Calculates the exponential of value.

Calculates the exponential of value.

Calculates the exponential of value.

Calculates the exponential of value.

Calculates 2 raised to the power value.

Calculates 2 raised to the power value.

Calculates 2 raised to the power value.

Calculates the exponential of value, minus 1.

Calculates the exponential of value, minus 1.

Calculates the exponential of value, minus 1.

Fused multiply-add; returns value1 * value2 + value3, performing a single rounding instead of two.

Fused multiply-add; returns value1 * value2 + value3, performing a single rounding instead of two.

Fused multiply-add; returns value1 * value2 + value3, performing a single rounding instead of two.

Decomposes the given floating-point value into a normalized fraction and an integral power of two.

Decomposes the given floating-point value into a normalized fraction and an integral power of two.

Decomposes the given floating-point value into a normalized fraction and an integral power of two.

Decomposes the given floating-point value into a normalized fraction and an integral power of two.

Calculates the gamma function of value.

Note that #gamma(n) is same as fact(n - 1) for integer n > 0. However #gamma(n) returns float and can be an approximation.

Calculates the gamma function of value.

Note that #gamma(n) is same as fact(n - 1) for integer n > 0. However #gamma(n) returns float and can be an approximation.

Calculates the gamma function of value.

Note that #gamma(n) is same as fact(n - 1) for integer n > 0. However #gamma(n) returns float and can be an approximation.

Calculates the length of the hypotenuse from (0, 0) to (value1, value2).

Calculates the length of the hypotenuse from (0, 0) to (value1, value2).

Calculates the length of the hypotenuse from (0, 0) to (value1, value2).

Returns the unbiased base 2 exponent of the given floating-point value.

Returns the unbiased base 2 exponent of the given floating-point value.

Returns the unbiased base 2 exponent of the given floating-point value.

Raises ArgumentError if value is zero.

Returns the unbiased base 2 exponent of the given floating-point value.

Calculates the integer square root of value.

Calculates the integer square root of value.

Multiplies the given floating-point value by 2 raised to the power exp.

Multiplies the given floating-point value by 2 raised to the power exp.

Multiplies the given floating-point value by 2 raised to the power exp.

Multiplies the given floating-point value by 2 raised to the power exp.

Calculates the logarithmic gamma of value.

Calculates the logarithmic gamma of value.

Calculates the logarithmic gamma of value.

Calculates the logarithm of value to the given base.

Calculates the natural logarithm of value.

Calculates the natural logarithm of value.

Calculates the natural logarithm of value.

Calculates the natural logarithm of value.

Calculates the logarithm of value to base 10.

Calculates the logarithm of value to base 10.

Calculates the logarithm of value to base 10.

Calculates the logarithm of value to base 10.

Calculates the natural logarithm of 1 plus value.

Calculates the natural logarithm of 1 plus value.

Calculates the natural logarithm of 1 plus value.

Calculates the logarithm of value to base 2.

Calculates the logarithm of value to base 2.

Calculates the logarithm of value to base 2.

Calculates the logarithm of value to base 2.

Returns the unbiased radix-independent exponent of the given floating-point value.

For Float32 and Float64 this is equivalent to #ilogb.

Returns the unbiased radix-independent exponent of the given floating-point value.

For Float32 and Float64 this is equivalent to #ilogb.

Returns the unbiased radix-independent exponent of the given floating-point value.

For BigFloat this is equivalent to #ilogb.

Raises ArgumentError is value is zero.

Returns the unbiased radix-independent exponent of the given floating-point value.

For Float32 and Float64 this is equivalent to #ilogb.

Returns the greater of value1 and value2.

Returns the greater of value1 and value2.

Returns the greater of value1 and value2.

Returns the smaller of value1 and value2.

Returns the smaller of value1 and value2.

Returns the smaller of value1 and value2.

Computes the smallest nonnegative power of 2 that is greater than or equal to v.

The returned value has the same type as the argument. Raises OverflowError if the result does not fit into the argument's type.

Computes the smallest nonnegative power of 2 that is greater than or equal to v.

The returned value has the same type as the argument.

Returns the floating-point value with its exponent raised by exp.

For Float32 and Float64 this is equivalent to #ldexp.

Returns the floating-point value with its exponent raised by exp.

For Float32 and Float64 this is equivalent to #ldexp.

Returns the floating-point value with its exponent raised by exp.

For BigFloat this is equivalent to #ldexp.

Returns the floating-point value with its exponent raised by exp.

For Float32 and Float64 this is equivalent to #ldexp.

Returns the floating-point value with its exponent raised by exp.

For Float32 and Float64 this is equivalent to #ldexp.

Returns the floating-point value with its exponent raised by exp.

For Float32 and Float64 this is equivalent to #ldexp.

Returns the floating-point value with its exponent raised by exp.

For BigFloat this is equivalent to #ldexp.

Returns the floating-point value with its exponent raised by exp.

For Float32 and Float64 this is equivalent to #ldexp.

Calculates the sine of value, measured in radians.

Calculates the sine of value, measured in radians.

Calculates the sine of value, measured in radians.

Calculates the hyperbolic sine of value.

Calculates the hyperbolic sine of value.

Calculates the hyperbolic sine of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the square root of value.

Calculates the square root of value. Inspired by the following blog post of Pavel Panchekha on floating point precision.

Although the imaginary number is defined as i = sqrt(-1), calling Math.sqrt with a negative number will return -NaN. To obtain the result in the complex plane, Math.sqrt must be called with a complex number.

Calculates the square root of value.

Calculates the tangent of value, measured in radians.

Calculates the tangent of value, measured in radians.

Calculates the tangent of value, measured in radians.

Calculates the hyperbolic tangent of value.

Calculates the hyperbolic tangent of value.

Calculates the hyperbolic tangent of value.

**Examples:**

Example 1 (javascript):
```javascript
require "complex"

Math.exp(4 + 2.i) # => -22.720847417619233 + 49.645957334580565.i
```

Example 2 (javascript):
```javascript
Math.fma(0.1, 10.0, -1.0) # => 5.551115123125783e-17
1.0 * 10.0 - 1.0          # => 0.0
```

Example 3 (javascript):
```javascript
Math.fma(0.1, 10.0, -1.0) # => 5.551115123125783e-17
1.0 * 10.0 - 1.0          # => 0.0
```

Example 4 (javascript):
```javascript
Math.fma(0.1, 10.0, -1.0) # => 5.551115123125783e-17
1.0 * 10.0 - 1.0          # => 0.0
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/INI.html

**Contents:**
- module INI
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

NOTE To use INI, you must explicitly import it with require "ini"

Generates an INI-style configuration from a given hash.

Appends INI data to the given IO.

Parses INI-style configuration from the given string.

Generates an INI-style configuration from a given hash.

Appends INI data to the given IO.

Parses INI-style configuration from the given string. Raises a ParseException on any errors.

**Examples:**

Example 1 (javascript):
```javascript
require "ini"

INI.build({"foo" => {"a" => "1"}}, true) # => "[foo]\na = 1\n\n"
```

Example 2 (javascript):
```javascript
require "ini"

INI.parse("[foo]\na = 1") # => {"foo" => {"a" => "1"}}
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Colorize.html

**Contents:**
- module Colorize
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

With Colorize you can change the fore- and background colors and text decorations when rendering text on terminals supporting ANSI escape codes. It adds the colorize method to Object and thus all classes as its main interface, which calls to_s and surrounds it with the necessary escape codes when it comes to obtaining a string representation of the object.

NOTE To use Colorize, you must explicitly import it with require "colorize"

Its first argument changes the foreground color:

There are alternative ways to change the foreground color:

To change the background color, the following methods are available:

You can also pass an RGB color to colorize:

It's also possible to change the text decoration:

The colorize method returns a Colorize::Object instance, which allows chaining methods together:

With the toggle method you can temporarily disable adding the escape codes. Settings of the instance are preserved however and can be turned back on later:

The color :default leaves the object's representation as it is but the object is a Colorize::Object then which is handy in conditions such as:

Available colors are:

See Colorize::Mode for available text decorations.

Returns whether colorization should be enabled by default on the given standard output and error streams.

Objects will only be colored if this is true, unless overridden by Colorize::Object#toggle.

Objects will only be colored if this is true, unless overridden by Colorize::Object#toggle.

Resets Colorize.enabled? to its initial default value, i.e.

Resets the color and text decoration of the io.

Helper method to use colorize with IO.

Returns whether colorization should be enabled by default on the given standard output and error streams.

This is true if both streams are terminals (i.e. IO#tty? returns true), the TERM environment variable is not equal to dumb, and the NO_COLOR environment variable is not set to a non-empty string.

Objects will only be colored if this is true, unless overridden by Colorize::Object#toggle.

NOTE This is by default enabled if .default_enabled? is true for STDOUT and STDERR.

Objects will only be colored if this is true, unless overridden by Colorize::Object#toggle.

NOTE This is by default enabled if .default_enabled? is true for STDOUT and STDERR.

Resets Colorize.enabled? to its initial default value, i.e. whether .default_enabled? is true for STDOUT and STDERR. Returns this new value.

This can be used to revert Colorize.enabled? to its initial state after colorization is explicitly enabled or disabled.

Resets the color and text decoration of the io.

Helper method to use colorize with IO.

**Examples:**

Example 1 (json):
```json
require "colorize"

"foo".colorize(:green)
100.colorize(:red)
[1, 2, 3].colorize(:blue)
```

Example 2 (unknown):
```unknown
require "colorize"

"foo".colorize.fore(:green)
"foo".colorize.green
```

Example 3 (unknown):
```unknown
require "colorize"

"foo".colorize.back(:green)
"foo".colorize.on(:green)
"foo".colorize.on_green
```

Example 4 (markdown):
```markdown
require "colorize"

"foo".colorize(0, 255, 255)      # => "foo" in aqua
"foo".colorize.fore(0, 255, 255) # => "foo" in aqua

# This is the same as:

"foo".colorize(Colorize::ColorRGB.new(0, 255, 255))      # => "foo" in aqua
"foo".colorize.fore(Colorize::ColorRGB.new(0, 255, 255)) # => "foo" in aqua
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI.html

**Contents:**
- abstract class LLVM::ABI
- Overview
- Direct Known Subclasses
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Based on https://github.com/rust-lang/rust/blob/29ac04402d53d358a1f6200bea45a301ff05b2d1/src/librustc_trans/trans/cabi.rs

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OAuth2/AccessToken.html

**Contents:**
- abstract class OAuth2::AccessToken
- Overview
- Direct Known Subclasses
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Base class for the two possible access tokens: Bearer and Mac.

Use #authenticate to authenticate an HTTP::Client.

JSON key-value pairs that are outside of the OAuth2 spec are stored in this property in case they are needed.

JSON key-value pairs that are outside of the OAuth2 spec are stored in this property in case they are needed.

JSON key-value pairs that are outside of the OAuth2 spec are stored in this property in case they are needed. Their value is the raw JSON string found in the JSON value (with possible changes in the string format, but preserving JSON semantic). For example if the value was [1, 2, 3] then the value in this hash will be the string "[1,2,3]".

JSON key-value pairs that are outside of the OAuth2 spec are stored in this property in case they are needed. Their value is the raw JSON string found in the JSON value (with possible changes in the string format, but preserving JSON semantic). For example if the value was [1, 2, 3] then the value in this hash will be the string "[1,2,3]".

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/UDPSocket.html

**Contents:**
- class UDPSocket
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class IPSocket
  - Instance methods inherited from class Socket
  - Constructor methods inherited from class Socket
  - Class methods inherited from class Socket
  - Instance methods inherited from module Crystal::System::Socket

A User Datagram Protocol (UDP) socket.

UDP runs on top of the Internet Protocol (IP) and was developed for applications that do not require reliability, acknowledgement, or flow control features at the transport layer. This simple protocol provides transport layer addressing in the form of UDP ports and an optional checksum capability.

UDP is a very simple protocol. Messages, so called datagrams, are sent to other hosts on an IP network without the need to set up special transmission channels or data paths beforehand. The UDP socket only needs to be opened for communication. It listens for incoming messages and sends outgoing messages on request.

This implementation supports both IPv4 and IPv6 addresses. For IPv4 addresses you must use Socket::Family::INET family (default) or Socket::Family::INET6 for IPv6 # addresses.

NOTE To use UDPSocket, you must explicitly import it with require "socket"

The send methods may sporadically fail with Socket::ConnectError when sending datagrams to a non-listening server. Wrap with an exception handler to prevent raising. Example:

A host must become a member of a multicast group before it can receive datagrams sent to the group.

Drops membership to the specified group.

Returns the current value of the hoplimit field on uni-cast packets.

The multicast hops option controls the hoplimit field on uni-cast packets.

For hosts with multiple interfaces, each multicast transmission is sent from the primary network interface.

For hosts with multiple interfaces, each multicast transmission is sent from the primary network interface.

Sets whether transmitted multicast packets should be copied and sent back to the originator, if the host has joined the multicast group.

Reports whether transmitted multicast packets should be copied and sent back to the originator.

Receives a binary message from the previously bound address.

Receives a text message from the previously bound address.

A host must become a member of a multicast group before it can receive datagrams sent to the group. Raises Socket::Error if an incompatible address is provided.

Drops membership to the specified group. Memberships are automatically dropped when the socket is closed or the process exits. Raises Socket::Error if an incompatible address is provided.

Returns the current value of the hoplimit field on uni-cast packets. Datagrams with a hoplimit of 1 are not forwarded beyond the local network. Multicast datagrams with a hoplimit of 0 will not be transmitted on any network, but may be delivered locally if the sending host belongs to the destination group and multicast loopback is enabled.

The multicast hops option controls the hoplimit field on uni-cast packets. If -1 is specified, the kernel will use a default value. If a value of 0 to 255 is specified, the packet will have the specified value as hoplimit. Other values are considered invalid and Socket::Error will be raised. Datagrams with a hoplimit of 1 are not forwarded beyond the local network. Multicast datagrams with a hoplimit of 0 will not be transmitted on any network, but may be delivered locally if the sending host belongs to the destination group and multicast loopback is enabled.

For hosts with multiple interfaces, each multicast transmission is sent from the primary network interface. This function overrides the default IPv4 interface address for subsequent transmissions. Setting the interface to 0.0.0.0 will select the default interface. Raises Socket::Error unless the socket is IPv4 and an IPv4 address is provided.

For hosts with multiple interfaces, each multicast transmission is sent from the primary network interface. This function overrides the default IPv6 interface for subsequent transmissions. Setting the interface to index 0 will select the default interface.

Sets whether transmitted multicast packets should be copied and sent back to the originator, if the host has joined the multicast group.

Reports whether transmitted multicast packets should be copied and sent back to the originator.

Receives a binary message from the previously bound address.

Receives a text message from the previously bound address.

**Examples:**

Example 1 (sql):
```sql
require "socket"

# Create server
server = UDPSocket.new
server.bind "localhost", 1234

# Create client and connect to server
client = UDPSocket.new
client.connect "localhost", 1234

# Send a text message to server
client.send "message"

# Receive text message from client
message, client_addr = server.receive

# Close client and server
client.close
server.close
```

Example 2 (julia):
```julia
begin
  client.send(message, @destination)
rescue ex : Socket::ConnectError
  p ex.inspect
end
```

Example 3 (unknown):
```unknown
require "socket"

server = UDPSocket.new
server.bind "localhost", 1234

message = Bytes.new(32)
bytes_read, client_addr = server.receive(message)
```

Example 4 (unknown):
```unknown
require "socket"

server = UDPSocket.new
server.bind("localhost", 1234)

message, client_addr = server.receive
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/Orc/LLJIT.html

**Contents:**
- class LLVM::Orc::LLJIT
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

EXPERIMENTAL The C API wrapped by this type is marked as experimental by LLVM.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/Format/ISO_8601_DATE_TIME.html

**Contents:**
- module Time::Format::ISO_8601_DATE_TIME
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

The ISO 8601 date time format.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

**Examples:**

Example 1 (yaml):
```yaml
Time::Format::ISO_8601_DATE_TIME.format(Time.utc(2016, 2, 15, 4, 35, 50)) # => "2016-02-15 04:35:50Z"
Time::Format::ISO_8601_DATE_TIME.parse("2016-02-15T04:35:50Z")            # => 2016-02-15 04:35:50Z
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/IO/Memory.html

**Contents:**
- class IO::Memory
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class IO
  - Class methods inherited from class IO
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

An IO that reads and writes from a buffer in memory.

The internal buffer can be resizeable and/or writeable depending on how an IO::Memory is constructed.

Creates an empty, resizeable and writeable IO::Memory with the given initial capacity for the internal buffer.

Creates an IO::Memory whose contents are the exact contents of string.

Creates an IO::Memory that will read, and optionally write, from/to the given slice.

Returns the internal buffer as a Pointer(UInt8).

Clears the internal buffer and resets the position to zero.

Determines if this IO is closed.

Returns true if this IO::Memory has no contents.

Reads the rest of this IO data as a writable Bytes.

Reads the rest of this IO data as a String.

Peeks into this IO, if possible.

Returns the current position (in bytes) of this IO.

Sets the current position (in bytes) of this IO.

Yields an IO::Memory to read a section of this IO's buffer.

Reads a single byte from this IO.

Rewinds this IO to the initial position (zero).

Seeks to a given offset (in bytes) according to the whence argument.

Returns the total number of bytes in this IO.

Reads and discards bytes from self until there are no more bytes.

Appends this internal buffer to the given IO.

Returns a new String that contains the contents of the internal buffer.

Returns the underlying bytes.

Creates an empty, resizeable and writeable IO::Memory with the given initial capacity for the internal buffer.

Creates an IO::Memory whose contents are the exact contents of string. The created IO::Memory is non-resizeable and non-writeable.

The IO starts at position zero for reading.

Creates an IO::Memory that will read, and optionally write, from/to the given slice. The created IO::Memory is non-resizeable.

The IO starts at position zero for reading.

Returns the internal buffer as a Pointer(UInt8).

Clears the internal buffer and resets the position to zero. Raises if this IO::Memory is non-resizeable.

Closes this IO. Further operations on this IO will raise an IO::Error.

Determines if this IO is closed.

Returns true if this IO::Memory has no contents.

Reads the rest of this IO data as a writable Bytes.

Reads the rest of this IO data as a String.

Peeks into this IO, if possible.

The returned bytes are only valid data until a next call to any method that reads from this IO is invoked.

By default this method returns nil, but IO implementations that provide buffering or wrap other IOs should override this method.

Returns the current position (in bytes) of this IO.

Sets the current position (in bytes) of this IO.

Yields an IO::Memory to read a section of this IO's buffer.

During the block duration self becomes read-only, so multiple concurrent open are allowed.

Reads a single byte from this IO. Returns nil if there is no more data to read.

Rewinds this IO to the initial position (zero).

Seeks to a given offset (in bytes) according to the whence argument.

Returns the total number of bytes in this IO.

Reads and discards bytes from self until there are no more bytes.

Appends this internal buffer to the given IO.

Returns a new String that contains the contents of the internal buffer.

Returns the underlying bytes.

See IO#write(slice). Raises if this IO::Memory is non-writeable, or if it's non-resizeable and a resize is needed.

See IO#write_byte. Raises if this IO::Memory is non-writeable, or if it's non-resizeable and a resize is needed.

**Examples:**

Example 1 (javascript):
```javascript
io = IO::Memory.new
slice = Bytes.new(1)
io.pos         # => 0
io.read(slice) # => 0
slice          # => Bytes[0]
```

Example 2 (javascript):
```javascript
io = IO::Memory.new "hello"
io.pos        # => 0
io.gets(2)    # => "he"
io.print "hi" # raises IO::Error
```

Example 3 (javascript):
```javascript
slice = Slice.new(6) { |i| ('a'.ord + i).to_u8 }
io = IO::Memory.new slice, writeable: false
io.pos            # => 0
io.read(slice)    # => 6
String.new(slice) # => "abcdef"
```

Example 4 (javascript):
```javascript
io = IO::Memory.new
io << "abc"
io.rewind
io.gets(1) # => "a"
io.clear
io.pos         # => 0
io.gets_to_end # => ""

io = IO::Memory.new "hello"
io.clear # raises IO::Error
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OpenSSL.html

**Contents:**
- module OpenSSL
- Overview
- Security Considerations
- Usage Example
  - Server side
  - Client side
- Defined in:

The OpenSSL module allows for access to Secure Sockets Layer (SSL) and Transport Layer Security (TLS) encryption, as well as classes for encrypting data, decrypting data, and computing hashes. It uses the SSL library provided by the operating system, which may be either OpenSSL or LibreSSL.

WARNING This module should not be used without first reading the Security considerations.

To create secure sockets, use either OpenSSL::SSL::Socket::Client for client applications, or OpenSSL::SSL::Socket::Server for servers. These classes use a default context, but you can provide your own by supplying an OpenSSL::SSL::Context. For more control, consider subclassing OpenSSL::SSL::Socket.

Hashing algorithms are provided by classes such as Digest::SHA256 and Digest::MD5. If you need a different option, you can initialize one using the name of the digest with OpenSSL::Digest. A Hash-based Message Authentication Code (HMAC) can be computed using HMAC and specifying a digest Algorithm.

The OpenSSL::Cipher class can be used for encrypting and decrypting data.

NOTE To use OpenSSL, you must explicitly import it using the require "openssl" statement.

Crystal aims to provide reasonable configuration defaults in accordance with Mozilla's recommendations. However, these defaults may not be suitable for your application. It is recommended that you refer to the Open Worldwide Application Security Project (OWASP) cheat sheet on implementing transport layer protection to ensure the appropriate configuration for your use.

If you come across any shortcomings or spots for improvement in Crystal's configuration options, please don't hesitate to let us know by opening an issue.

An SSL server is created with a TCPServer and a SSL::Context. You can then use the SSL server like an ordinary TCP server.

NOTE For the below example to work, a certificate and private key should be attained.

An SSL client is created with a TCPSocket and a SSL::Context. Unlike a SSL server, a client does not require a certificate or private key.

NOTE By default, closing an SSL::Socket does not close the underlying socket. You need to set SSL::Socket#sync_close= to true if you want this behaviour.

**Examples:**

Example 1 (julia):
```julia
require "openssl"
require "socket"

PORT = ENV["PORT"] ||= "5555"

# Bind new TCPServer to PORT
socket = TCPServer.new(PORT.to_i)

context = OpenSSL::SSL::Context::Server.new
context.private_key = "/path/to/private.key"
context.certificate_chain = "/path/to/public.cert"

puts "Server is up. Listening on port #{PORT}."

socket.accept do |client|
  puts "Got client"

  bytes = Bytes.new(20)

  OpenSSL::SSL::Socket::Server.open(client, context) do |ssl_socket|
    ssl_socket.read(bytes)
  end

  puts "Client said: #{String.new(bytes)}"
end

socket.close
puts "Server has stopped."
```

Example 2 (julia):
```julia
require "openssl"
require "socket"

PORT = ENV["PORT"] ||= "5555"

# Bind TCPSocket to PORT and open a connection
TCPSocket.open("127.0.0.1", PORT) do |socket|
  context = OpenSSL::SSL::Context::Client.new

  OpenSSL::SSL::Socket::Client.open(socket, context) do |ssl_socket|
    ssl_socket << "Hello from client!"
  end
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/File.html

**Contents:**
- class File
- Overview
- Temporary Files
- Included Modules
- Defined in:
- Constant Summary
- Constructors
- Class Method Summary
- Instance Method Summary
  - Class methods inherited from module Crystal::System::File

A File instance represents a file entry in the local file system and allows using it as an IO.

See .new for various options mode can be.

Every tempfile is operated as a File, including initializing, reading and writing.

Files created from .tempfile are stored in a directory that handles temporary files (Dir.tempdir):

It is encouraged to delete a tempfile after using it, which ensures they are not left behind in your filesystem until garbage collected.

The name of the null device on the host platform. /dev/null on UNIX and NUL on win32.

When this device is opened using File.open, read operations will always return EOF, and any data written will be immediately discarded.

The file/directory separator character. '/' on all platforms.

The file/directory separator string. "/" on all platforms.

Opens the file named by filename.

DEPRECATED parameter blocking

Opens the file named by filename.

DEPRECATED parameter blocking

Returns the last component of the given path.

Returns the last component of the given path.

Changes the permissions of the specified file.

Changes the owner of the specified file.

Copies the file src to the file dst.

Deletes the file at path.

Deletes the file at path, or returns false if the file does not exist.

Returns true if the given path exists and is a directory.

Returns all components of the given path except the last one.

Yields each line in filename to the given block.

DEPRECATED parameter blocking

Returns true if the file at path is empty, otherwise returns false.

Returns true if path is executable by the real user id of this process else returns false.

DEPRECATED Use File::Info.executable? instead

Returns whether the file given by path exists.

Converts path to an absolute path.

Returns filename's extension, or an empty string if it has no extension.

Returns true if given path exists and is a file.

Returns a File::Info object for the file given by path or raises File::Error in case of an error.

Returns a File::Info object for the file given by path or returns nil if the file does not exist.

Returns a new string formed by joining the strings using File::SEPARATOR.

Returns a new string formed by joining the strings using File::SEPARATOR.

Creates a new link (also known as a hard link) at new_path to an existing file given by old_path.

Matches path against pattern.

Opens the file named by filename.

DEPRECATED parameter blocking

Returns the content of filename as a string.

DEPRECATED parameter blocking

Returns all lines in filename as an array of strings.

DEPRECATED parameter blocking

Returns true if path is readable by the real user id of this process else returns false.

DEPRECATED Use File::Info.readable? instead

Returns the target of a symbolic link.

Returns the target of a symbolic link.

Resolves the real path of path by following symbolic links.

DEPRECATED Use .realpath instead.

Resolves the real path of path by following symbolic links.

Moves old_filename to new_filename.

Returns true if path1 and path2 represents the same file.

Compares two files filename1 to filename2 to determine if they are identical.

Returns the size of the file at filename in bytes.

Creates a symbolic link at new_path to an existing file given by old_path.

Returns true if the path is a symbolic link.

Creates a temporary file.

Creates a temporary file.

Creates a temporary file and yields it to the given block.

Creates a temporary file and yields it to the given block.

Returns a fully-qualified path to a temporary file.

Returns a fully-qualified path to a temporary file.

Attempts to set the access and modification times of the file named in the filename parameter to the value given in time.

Sets the access and modification times of filename.

Returns true if path is writable by the real user id of this process else returns false.

DEPRECATED Use File::Info.writable? instead

Writes the given content to filename.

DEPRECATED parameter blocking

Changes the permissions of the specified file.

Changes the owner of the specified file.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Yields an IO to read a section inside this file.

Rename the current File

Returns the size in bytes of the currently opened file.

Attempts to set the access and modification times to the value given in time.

Truncates the file to the specified size.

Sets the access and modification times

Opens the file named by filename.

mode must be one of the following file open modes:

Line endings are preserved on all platforms. The b mode flag has no effect; it is provided only for POSIX compatibility.

NOTE The blocking arg is deprecated since Crystal 1.17. It used to be true by default to denote a regular disk file (always ready in system event loops) and could be set to false when the file was known to be a fifo, pipe, or character device (for example /dev/tty). The event loop now chooses the appropriate blocking mode automatically and there are no reasons to change it anymore.

NOTE On macOS files are always opened in blocking mode because non-blocking FIFO files don't work — the OS exhibits issues with readiness notifications.

DEPRECATED parameter blocking

Opens the file named by filename. If a file is being created, its initial permissions may be set using the perm parameter.

See self.new for what mode can be.

DEPRECATED parameter blocking

Returns the last component of the given path.

If suffix is present at the end of path, it is removed.

Returns the last component of the given path.

Changes the permissions of the specified file.

Symlinks are dereferenced, so that only the permissions of the symlink destination are changed, never the permissions of the symlink itself.

Use #chmod if the File is already open.

Changes the owner of the specified file.

Unless follow_symlinks is set to true, then the owner symlink itself will be changed, otherwise the owner of the symlink destination file will be changed. For example, assuming symlinks as foo -> bar -> baz:

Use #chown if the File is already open.

Copies the file src to the file dst. Permission bits are copied too.

Deletes the file at path. Raises File::Error on failure.

On Windows, this also deletes reparse points, including symbolic links, regardless of whether the reparse point is a directory.

Deletes the file at path, or returns false if the file does not exist. Raises File::Error on other kinds of failure.

On Windows, this also deletes reparse points, including symbolic links, regardless of whether the reparse point is a directory.

Returns true if the given path exists and is a directory.

Returns all components of the given path except the last one.

Yields each line in filename to the given block.

DEPRECATED parameter blocking

Returns true if the file at path is empty, otherwise returns false. Raises File::NotFoundError if the file at path does not exist.

Returns true if path is executable by the real user id of this process else returns false.

DEPRECATED Use File::Info.executable? instead

Returns whether the file given by path exists.

Symbolic links are dereferenced, possibly recursively. Returns false if a symbolic link refers to a non-existent file.

Converts path to an absolute path. Relative paths are referenced from the current working directory of the process unless dir is given, in which case it will be used as the starting point. "~" is expanded to the value passed to home. If it is false (default), home is not expanded. If true, it is expanded to the user's home directory (Path.home).

Returns filename's extension, or an empty string if it has no extension.

Returns true if given path exists and is a file.

Returns a File::Info object for the file given by path or raises File::Error in case of an error.

If follow_symlinks is set (the default), symbolic links are followed. Otherwise, symbolic links return information on the symlink itself.

Use IO::FileDescriptor#info if the file is already open.

Returns a File::Info object for the file given by path or returns nil if the file does not exist.

If follow_symlinks is set (the default), symbolic links are followed. Otherwise, symbolic links return information on the symlink itself.

Use IO::FileDescriptor#info if the file is already open.

Returns a new string formed by joining the strings using File::SEPARATOR.

Returns a new string formed by joining the strings using File::SEPARATOR.

Creates a new link (also known as a hard link) at new_path to an existing file given by old_path.

Matches path against pattern.

The pattern syntax is similar to shell filename globbing. It may contain the following metacharacters:

Multiple character pattern can be combined in the same brackets to define a character class (for example: [0-9a-f]).

If path is a Path, all directory separators supported by path are recognized, according to the path's kind. If path is a String, only / is considered a directory separator.

NOTE Only / in pattern matches directory separators in path.

Opens the file named by filename. If a file is being created, its initial permissions may be set using the perm parameter. Then given block will be passed the opened file as an argument, the file will be automatically closed when the block returns.

See self.new for what mode can be.

DEPRECATED parameter blocking

Returns the content of filename as a string.

Raises File::Error if the file cannot be read.

DEPRECATED parameter blocking

Returns all lines in filename as an array of strings.

DEPRECATED parameter blocking

Returns true if path is readable by the real user id of this process else returns false.

DEPRECATED Use File::Info.readable? instead

Returns the target of a symbolic link.

Returns the target of a symbolic link.

Returns nil if path does not exist or is not a symbolic link.

Resolves the real path of path by following symbolic links.

DEPRECATED Use .realpath instead.

Resolves the real path of path by following symbolic links.

Moves old_filename to new_filename.

Returns true if path1 and path2 represents the same file. The comparison take symlinks in consideration if follow_symlinks is true.

Compares two files filename1 to filename2 to determine if they are identical. Returns true if content are the same, false otherwise.

Returns the size of the file at filename in bytes. Raises File::NotFoundError if the file at filename does not exist.

Creates a symbolic link at new_path to an existing file given by old_path.

Returns true if the path is a symbolic link.

Creates a temporary file.

prefix and suffix are appended to the front and end of the file name, respectively.

NOTE These path values may contain directory separators. It's the caller's responsibility to ensure they are used safely. For example by rejecting user-provided values that would result in navigating the directory tree.

The file will be placed in dir which defaults to the standard temporary directory Dir.tempdir.

encoding and invalid are passed to IO#set_encoding.

It is the caller's responsibility to remove the file when no longer needed.

Creates a temporary file.

prefix and suffix are appended to the front and end of the file name, respectively.

NOTE These path values may contain directory separators. It's the caller's responsibility to ensure they are used safely. For example by rejecting user-provided values that would result in navigating the directory tree.

The file will be placed in dir which defaults to the standard temporary directory Dir.tempdir.

encoding and invalid are passed to IO#set_encoding.

It is the caller's responsibility to remove the file when no longer needed.

Creates a temporary file and yields it to the given block. It is closed and returned at the end of this method call.

prefix and suffix are appended to the front and end of the file name, respectively. These values may contain directory separators.

The file will be placed in dir which defaults to the standard temporary directory Dir.tempdir.

encoding and invalid are passed to IO#set_encoding.

It is the caller's responsibility to remove the file when no longer needed.

Creates a temporary file and yields it to the given block. It is closed and returned at the end of this method call.

prefix and suffix are appended to the front and end of the file name, respectively.

NOTE These path values may contain directory separators. It's the caller's responsibility to ensure they are used safely. For example by rejecting user-provided values that would result in navigating the directory tree.

The file will be placed in dir which defaults to the standard temporary directory Dir.tempdir.

encoding and invalid are passed to IO#set_encoding.

It is the caller's responsibility to remove the file when no longer needed.

Returns a fully-qualified path to a temporary file. The file is not actually created on the file system.

prefix and suffix are appended to the front and end of the file name, respectively.

NOTE These path values may contain directory separators. It's the caller's responsibility to ensure they are used safely. For example by rejecting user-provided values that would result in navigating the directory tree.

The path will be placed in dir which defaults to the standard temporary directory Dir.tempdir.

Returns a fully-qualified path to a temporary file. The optional suffix is appended to the file name.

Attempts to set the access and modification times of the file named in the filename parameter to the value given in time.

If the file does not exist, it will be created.

Use #touch if the File is already open.

Sets the access and modification times of filename.

Use #utime if the File is already open.

Returns true if path is writable by the real user id of this process else returns false.

DEPRECATED Use File::Info.writable? instead

Writes the given content to filename.

By default, an existing file will be overwritten.

filename will be created if it does not already exist.

NOTE If the content is a Slice(UInt8), those bytes will be written. If it's an IO, all bytes from the IO will be written. Otherwise, the string representation of content will be written (the result of invoking to_s on content).

See self.new for what mode can be.

DEPRECATED parameter blocking

Changes the permissions of the specified file.

Changes the owner of the specified file.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Yields an IO to read a section inside this file. Multiple sections can be read concurrently.

Rename the current File

Returns the size in bytes of the currently opened file.

Attempts to set the access and modification times to the value given in time.

Truncates the file to the specified size. Requires that the current file is opened for writing.

Sets the access and modification times

**Examples:**

Example 1 (typescript):
```typescript
file = File.new("path/to/file")
content = file.gets_to_end
file.close

# Implicit close with `open` and a block:
content = File.open("path/to/file") do |file|
  file.gets_to_end
end

# Shortcut of the above:
content = File.read("path/to/file")

# Write to a file by opening with a "write mode" specified.
File.open("path/to/file", "w") do |file|
  file.print "hello"
end
# Content of file on disk will now be "hello".

# Shortcut of the above:
File.write("path/to/file", "hello")
```

Example 2 (javascript):
```javascript
tempfile = File.tempfile("foo")

File.size(tempfile.path)                   # => 6
File.info(tempfile.path).modification_time # => 2015-10-20 13:11:12Z
File.exists?(tempfile.path)                # => true
File.read_lines(tempfile.path)             # => ["foobar"]
```

Example 3 (javascript):
```javascript
File.tempfile("foo").path # => "/tmp/foo.ulBCPS"
```

Example 4 (unknown):
```unknown
tempfile = File.tempfile("foo")
tempfile.delete
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI/X86_64.html

**Contents:**
- class LLVM::ABI::X86_64
- Overview
- Defined in:
- Constant Summary
- Instance Method Summary
  - Instance methods inherited from class LLVM::ABI
  - Constructor methods inherited from class LLVM::ABI
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Based on https://github.com/rust-lang/rust/blob/29ac04402d53d358a1f6200bea45a301ff05b2d1/src/librustc_trans/trans/cabi_x86_64.rs See also, section 3.2.3 of the System V Application Binary Interface AMD64 Architecture Processor Supplement

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

returns the LLVM type (with attributes) and the number of integer and SSE registers needed to pass this value directly (ie.

returns the LLVM type (with attributes) and the number of integer and SSE registers needed to pass this value directly (ie. not using the stack)

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/MIME.html

**Contents:**
- module MIME
- Overview
- OS-provided MIME database
- Registering custom MIME types
- Loading a custom MIME database
- Defined in:
- Constant Summary
- Class Method Summary
- Class Method Detail

This module implements a global MIME registry.

NOTE To use MIME, you must explicitly import it with require "mime"

The registry will be populated with some default values (see DEFAULT_TYPES) as well as the operating system's MIME database.

Default initialization can be skipped by calling MIME.init(false) before the first query to the MIME database.

On a POSIX system, the following files are tried to be read in sequential order, stopping at the first existing file. These values override those from DEFAULT_TYPES.

Applications can register their own MIME types:

To load a custom MIME database, .load_mime_database can be called with an IO to read the database from.

Loaded values override previously defined mappings.

The data format must follow the format of mime.types: Each line declares a MIME type followed by a whitespace-separated list of extensions mapped to this type. Everything following a # is considered a comment until the end of line. Empty lines are ignored.

A limited set of default MIME types.

Returns all extensions registered for type.

Looks up the MIME type associated with extension.

Looks up the MIME type associated with extension.

Looks up the MIME type associated with extension.

Looks up the MIME type associated with extension.

Looks up the MIME type associated with the extension in filename.

Looks up the MIME type associated with the extension in filename.

Looks up the MIME type associated with the extension in filename.

Looks up the MIME type associated with the extension in filename.

Initializes the MIME database.

Initializes the MIME database loading contents from a file.

Reads MIME type mappings from io and registers the extension-to-type relation (see .register).

Register type for extension.

Returns all extensions registered for type.

Looks up the MIME type associated with extension.

A case-sensitive search is tried first, if this yields no result, it is matched case-insensitive. Returns default if extension is not registered.

Looks up the MIME type associated with extension.

A case-sensitive search is tried first, if this yields no result, it is matched case-insensitive. Raises KeyError if extension is not registered.

Looks up the MIME type associated with extension.

A case-sensitive search is tried first, if this yields no result, it is matched case-insensitive. Runs the given block if extension is not registered.

Looks up the MIME type associated with extension.

A case-sensitive search is tried first, if this yields no result, it is matched case-insensitive. Returns nil if extension is not registered.

Looks up the MIME type associated with the extension in filename.

A case-sensitive search is tried first, if this yields no result, it is matched case-insensitive. Returns default if extension is not registered.

Looks up the MIME type associated with the extension in filename.

A case-sensitive search is tried first, if this yields no result, it is matched case-insensitive. Raises KeyError if extension is not registered.

Looks up the MIME type associated with the extension in filename.

A case-sensitive search is tried first, if this yields no result, it is matched case-insensitive. Runs the given block if extension is not registered.

Looks up the MIME type associated with the extension in filename.

A case-sensitive search is tried first, if this yields no result, it is matched case-insensitive. Returns nil if extension is not registered.

Initializes the MIME database.

The default behaviour is to load the internal defaults as well as the OS-provided MIME database. This can be disabled with load_defaults set to false.

This method usually doesn't need to be called explicitly when the default behaviour is expected. It will be called implicitly with load_defaults: true when a query method is called and the MIME database has not been initialized before.

Calling this method repeatedly is allowed.

Initializes the MIME database loading contents from a file.

This will neither load the internal defaults nor the OS-provided MIME database, only the database at filename (using .load_mime_database).

Calling this method repeatedly is allowed.

Reads MIME type mappings from io and registers the extension-to-type relation (see .register).

The format follows that of mime.types: Each line is list of MIME type and zero or more extensions, separated by whitespace.

Register type for extension.

extension must start with a dot (.) and must not contain any null bytes.

**Examples:**

Example 1 (javascript):
```javascript
require "mime"

MIME.from_extension(".html")         # => "text/html"
MIME.from_filename("path/file.html") # => "text/html"
```

Example 2 (unknown):
```unknown
/etc/mime.types
/etc/httpd/mime.types                    # Mac OS X
/etc/httpd/conf/mime.types               # Apache
/etc/apache/mime.types                   # Apache 1
/etc/apache2/mime.types                  # Apache 2
/usr/local/etc/httpd/conf/mime.types
/usr/local/lib/netscape/mime.types
/usr/local/etc/httpd/conf/mime.types     # Apache 1.2
/usr/local/etc/mime.types                # FreeBSD
/usr/share/misc/mime.types               # OpenBSD
```

Example 3 (javascript):
```javascript
require "mime"

MIME.from_extension?(".cr")     # => nil
MIME.extensions("text/crystal") # => Set(String).new

MIME.register(".cr", "text/crystal")
MIME.from_extension?(".cr")     # => "text/crystal"
MIME.extensions("text/crystal") # => Set(String){".cr"}
```

Example 4 (markdown):
```markdown
require "mime"

# Load user-defined MIME types
File.open("~/.mime.types") do |io|
  MIME.load_mime_database(io)
end
```

---

## Concurrency¶

**URL:** https://crystal-lang.org/reference/1.18/guides/concurrency.html

**Contents:**
- Concurrency¶
- Concurrency vs. Parallelism¶
  - Fibers¶
  - Event loop¶
  - Channels¶
- Execution of a program¶
  - A Fiber¶
  - The Runtime Scheduler¶
  - Communicating data¶
- Sample code¶

The definitions of "concurrency" and "parallelism" sometimes get mixed up, but they are not the same.

A concurrent system is one that can be in charge of many tasks, although not necessarily executing them at the same time. You can think of yourself being in the kitchen cooking: you chop an onion, put it to fry, and while it's being fried you chop a tomato, but you are not doing all of those things at the same time: you distribute your time between those tasks. Parallelism would be to stir fry onions with one hand while with the other one you chop a tomato.

At the moment of this writing, Crystal has concurrency support but not parallelism: several tasks can be executed, and a bit of time will be spent on each of these, but two code paths are never executed at the same exact time.

A Crystal program by default executes in a single operating system thread, except for the garbage collector (currently Boehm GC). Parallelism is supported, but it is currently considered experimental. Check out this Crystal Blog post about parallelism for more information.

To achieve concurrency, Crystal has fibers. A fiber is in a way similar to an operating system thread except that it's much more lightweight and its execution is managed internally by the process. So, a program will spawn multiple fibers and Crystal will make sure to execute them when the time is right.

For everything I/O related there's an event loop. Some time-consuming operations are delegated to it, and while the event loop waits for that operation to finish the program can continue executing other fibers. A simple example of this is waiting for data to come through a socket.

Crystal has Channels inspired by CSP. They allow communicating data between fibers without sharing memory and without having to worry about locks, semaphores or other special structures.

When a program starts, it fires up a main fiber that will execute your top-level code. There, one can spawn many other fibers. The components of a program are:

A fiber is an execution unit that is more lightweight than a thread. It's a small object that has an associated stack of 8MB, which is what is usually assigned to an operating system thread.

Fibers, unlike threads, are cooperative. Threads are pre-emptive: the operating system might interrupt a thread at any time and start executing another one. A fiber must explicitly tell the Runtime Scheduler to switch to another fiber. For example if there's I/O to be waited on, a fiber will tell the scheduler "Look, I have to wait for this I/O to be available, you continue executing other fibers and come back to me when that I/O is ready".

The advantage of being cooperative is that a lot of the overhead of doing a context switch (switching between threads) is gone.

A Fiber is much more lightweight than a thread: even though it's assigned 8MB, it starts with a small stack of 4KB.

On a 64-bit machine it lets us spawn millions and millions of fibers. In a 32-bit machine we can only spawn 512 fibers, which is not a lot. But because 32-bit machines are starting to become obsolete, we'll bet on the future and focus more on 64-bit machines.

The scheduler has a queue of:

Because at this moment there's only a single thread executing your code, accessing and modifying a class variable in different fibers will work just fine. However, once multiple threads (parallelism) is introduced in the language, it might break. That's why the recommended mechanism to communicate data is using channels and sending messages between them. Internally, a channel implements all the locking mechanisms to avoid data races, but from the outside you use them as communication primitives, so you (the user) don't have to use locks.

To spawn a fiber you use spawn with a block:

Here we have two fibers: one reads from a socket and the other does a sleep. When the first fiber reaches the socket.gets line, it gets suspended, the Event Loop is told to continue executing this fiber when there's data in the socket, and the program continues with the second fiber. This fiber wants to sleep for 5 seconds, so the Event Loop is told to continue with this fiber in 5 seconds. If there aren't other fibers to execute, the Event Loop will wait until either of these events happen, without consuming CPU time.

The reason why socket.gets and sleep behave like this is because their implementations talk directly with the Runtime Scheduler and the Event Loop, there's nothing magical about it. In general, the standard library already takes care of doing all of this so you don't have to.

Note, however, that fibers don't get executed right away. For example:

Running the above code will produce no output and exit immediately.

The reason for this is that a fiber is not executed as soon as it is spawned. So, the main fiber, the one that spawns the above fiber, finishes its execution and the program exits.

One way to solve it is to do a sleep:

This program will now print "Hello!" for one second and then exit. This is because the sleep call will schedule the main fiber to be executed in a second, and then executes another "ready to execute" fiber, which in this case is the one above.

This time Fiber.yield will tell the scheduler to execute the other fiber. This will print "Hello!" until the standard output blocks (the system call will tell us we have to wait until the output is ready), and then execution continues with the main fiber and the program exits. Here the standard output might never block so the program will continue executing forever.

If we want to execute the spawned fiber for ever, we can use sleep without arguments:

Of course the above program can be written without spawn at all, just with a loop. sleep is more useful when spawning more than one fiber.

You can also spawn by passing a method call instead of a block. To understand why this is useful, let's look at this example:

The above program prints "10" ten times. The problem is that there's only one variable i that all spawned fibers refer to, and when Fiber.yield is executed its value is 10.

To solve this, we can do this:

Now it works because we are creating a Proc and we invoke it passing i, so the value gets copied and now the spawned fiber receives a copy.

To avoid all this boilerplate, the standard library provides a spawn macro that accepts a call expression and basically rewrites it to do the above. Using it, we end up with:

This is mostly useful with local variables that change at iterations. This doesn't happen with block arguments. For example, this works as expected:

We can use a channel for this:

First, the program spawns a fiber but doesn't execute it yet. When we invoke channel.receive, the main fiber blocks and execution continues with the spawned fiber. Then channel.send(nil) is invoked. Note that this send does not occupy space in the channel because there is a receive invoked prior to the first send, send is not blocked. Fibers only switch out when blocked or executing to completion. So the spawned fiber will continue after send, and execution will switch back to main fiber once puts "After send" is executed.

The main fiber then resumes at channel.receive, which was waiting for a value. Then the main fiber continues executing and finishes.

In the above example we used nil just to communicate that the fiber ended. We can also use channels to communicate values between fibers:

Note that when the program executes a receive, the current fiber blocks and execution continues with the other fiber. When channel.send(1) is executed, execution continues because send is non-blocking if the channel is not yet full. However, channel.send(2) does cause the fiber to block because the channel (which has a size of 1 by default) is full, so execution continues with the fiber that was waiting on that channel.

Here we are sending literal values, but the spawned fiber might compute this value by, for example, reading a file, or getting it from a socket. When this fiber will have to wait for I/O, other fibers will be able to continue executing code until I/O is ready, and finally when the value is ready and sent through the channel, the main fiber will receive it. For example:

The above program spawns two fibers. The first one creates a TCPServer, accepts one connection and reads lines from it, sending them to the channel. There's a second fiber reading lines from standard input. The main fiber reads the first 3 messages sent to the channel, either from the socket or stdin, then the program exits. The gets calls will block the fibers and tell the Event Loop to continue from there if data comes.

Likewise, we can wait for multiple fibers to complete execution, and gather their values:

You can, of course, use receive inside a spawned fiber:

Here channel.send is executed first, but since there's no one waiting for a value (yet), execution continues in other fibers. The second fiber is executed, there's a value on the channel, it's obtained, and execution continues, first with the first fiber, then with the main fiber, because Fiber.yield puts a fiber at the end of the execution queue.

The above examples use unbuffered channels: when sending a value, if a fiber is waiting on that channel then execution continues on that fiber.

With a buffered channel, invoking send won't switch to another fiber unless the buffer is full:

Note that the first send does not occupy space in the channel. This is because there is a receive invoked prior to the first send whereas the other 2 send invocations take place before their respective receive. The number of send calls do not exceed the bounds of the buffer and so the send fiber runs uninterrupted to completion.

Here's an example where all space in the buffer gets occupied:

Note that "End of send fiber" does not appear in the output because we receive the 3 send calls which means 3.times runs to completion and in turn unblocks the main fiber which executes to completion.

Here's the same snippet as the one we just saw - with the addition of a Fiber.yield call at the very bottom:

With the addition of a Fiber.yield call at the end of the snippet we see the "End of send fiber" message in the output which would have otherwise been missed due to the main fiber executing to completion.

**Examples:**

Example 1 (julia):
```julia
spawn do
  # ...
  socket.gets
  # ...
end

spawn do
  # ...
  sleep 5.seconds
  #  ...
end
```

Example 2 (julia):
```julia
spawn do
  loop do
    puts "Hello!"
  end
end
```

Example 3 (julia):
```julia
spawn do
  loop do
    puts "Hello!"
  end
end

sleep 1.second
```

Example 4 (julia):
```julia
spawn do
  loop do
    puts "Hello!"
  end
end

Fiber.yield
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/

**Contents:**
- Crystal
- Why?
- Project Status
- Installing
- Try it online
- Documentation
- Community
- Contributing

Crystal is a programming language with the following goals:

We love Ruby's efficiency for writing code.

We love C's efficiency for running code.

We want the best of both worlds.

We want the compiler to understand what we mean without having to specify types everywhere.

Oh, and we don't want to write C code to make the code run faster.

Within a major version, language features won't be removed or changed in any way that could prevent a Crystal program written with that version from compiling and working. The built-in standard library might be enriched, but it will always be done with backwards compatibility in mind.

Development of the Crystal language is possible thanks to the community's effort and the continued support of 84codes and every other sponsor.

Follow these installation instructions

play.crystal-lang.org

Have any questions or suggestions? Ask on the Crystal Forum, on our Gitter channel or IRC channel #crystal-lang at irc.libera.chat, or on Stack Overflow under the crystal-lang tag. There is also an archived Google Group.

The Crystal repository is hosted at crystal-lang/crystal on GitHub.

Read the general Contributing guide, and then:

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/IO/ByteFormat.html

**Contents:**
- module IO::ByteFormat
- Overview
  - Decode from bytes
  - Decode from an IO
  - Encode to bytes
  - Encode to IO
- Defined in:
- Instance Method Summary
- Instance Method Detail

Defines a byte format to encode integers and floats from/to Bytes and IO.

**Examples:**

Example 1 (javascript):
```javascript
bytes = Bytes[0x34, 0x12]
int16 = IO::ByteFormat::LittleEndian.decode(Int16, bytes)
int16 # => 0x1234_i16
```

Example 2 (javascript):
```javascript
io = IO::Memory.new(Bytes[0x34, 0x12])
int16 = io.read_bytes(Int16, IO::ByteFormat::LittleEndian)
int16 # => 0x1234_i16
```

Example 3 (yaml):
```yaml
raw = uninitialized UInt8[2]
IO::ByteFormat::LittleEndian.encode(0x1234_i16, raw.to_slice)
raw # => StaticArray[0x34, 0x12]
```

Example 4 (javascript):
```javascript
io = IO::Memory.new
io.write_bytes(0x1234_i16, IO::ByteFormat::LittleEndian)
io.to_slice # => Bytes[0x34, 0x12]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Socket.html

**Contents:**
- class Socket
- Included Modules
- Direct Known Subclasses
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Crystal::System::Socket
  - Class methods inherited from module Crystal::System::Socket
  - Instance methods inherited from module IO::Buffered

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Creates a Socket from an existing system file descriptor or socket handle.

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Creates a TCP socket.

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Creates an UDP socket.

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Creates an UNIX socket.

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Returns whether the blocking mode of fd is blocking (true) or non blocking (false).

Returns true if the string represents a valid IPv4 or IPv6 address.

DEPRECATED Use IPAddress.valid? instead

Changes the blocking mode of fd to be blocking (true) or non blocking (false).

Accepts an incoming connection.

Accepts an incoming connection.

Binds the socket to a local address.

Binds the socket on port to all local interfaces.

Binds the socket to a local address.

Returns whether the socket's mode is blocking (true) or non blocking (false).

DEPRECATED Use Socket.get_blocking instead.

Changes the socket's mode to blocking (true) or non blocking (false).

DEPRECATED Use Socket.set_blocking instead.

Calls shutdown(2) with SHUT_RD

Calls shutdown(2) with SHUT_WR

Returns true if this IO is closed.

Connects the socket to a remote host:port.

Connects the socket to a remote address.

Tries to connect to a remote address.

Returns the handle associated with this socket from the operating system.

Finalizes the socket resource.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

WARNING The behavior of SO_LINGER is platform specific.

Tells the previously bound socket to listen for incoming connections.

Tries to listen for connections on the previously bound socket.

The time to wait when reading before raising an IO::TimeoutError.

The time to wait when reading before raising an IO::TimeoutError.

Sets the number of seconds to wait when reading before raising an IO::TimeoutError.

DEPRECATED Use #read_timeout=(Time::Span?) instead.

Receives a binary message from the previously bound address.

Receives a text message from the previously bound address.

Sends a message to the specified remote address.

Sends a message to a previously connected remote address.

Returns true if this IO is associated with a terminal device (tty), false otherwise.

Sets the time to wait when writing before raising an IO::TimeoutError.

Sets the time to wait when writing before raising an IO::TimeoutError.

Sets the number of seconds to wait when writing before raising an IO::TimeoutError.

DEPRECATED Use #write_timeout=(Time::Span?) instead.

Creates a socket. Consider using TCPSocket, TCPServer, UDPSocket, UNIXSocket or UNIXServer unless you need full control over the socket.

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Creates a Socket from an existing system file descriptor or socket handle.

This adopts fd into the IO system that will reconfigure it as per the event loop runtime requirements.

NOTE On Windows, the handle must have been created with WSA_FLAG_OVERLAPPED.

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Creates a TCP socket. Consider using TCPSocket or TCPServer unless you need full control over the socket.

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Creates an UDP socket. Consider using UDPSocket unless you need full control over the socket.

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Creates an UNIX socket. Consider using UNIXSocket or UNIXServer unless you need full control over the socket.

DEPRECATED parameter #blocking Use Socket.set_blocking instead.

Returns whether the blocking mode of fd is blocking (true) or non blocking (false).

NOTE Only implemented on UNIX targets. Raises on Windows.

Returns true if the string represents a valid IPv4 or IPv6 address.

DEPRECATED Use IPAddress.valid? instead

Changes the blocking mode of fd to be blocking (true) or non blocking (false).

Accepts an incoming connection.

Returns the client socket. Raises an IO::Error (closed stream) exception if the server is closed after invoking this method.

Accepts an incoming connection.

Returns the client Socket or nil if the server is closed after invoking this method.

Binds the socket to a local address.

Binds the socket on port to all local interfaces.

Binds the socket to a local address.

Returns whether the socket's mode is blocking (true) or non blocking (false).

DEPRECATED Use Socket.get_blocking instead.

Changes the socket's mode to blocking (true) or non blocking (false).

WARNING The socket has been configured to behave correctly with the event loop runtime requirements. Changing the blocking mode can cause the event loop to misbehave, for example block the entire program when a fiber tries to read from this socket.

DEPRECATED Use Socket.set_blocking instead.

Calls shutdown(2) with SHUT_RD

Calls shutdown(2) with SHUT_WR

Returns true if this IO is closed.

IO defines returns false, but including types may override.

Connects the socket to a remote host:port.

Connects the socket to a remote address. Raises if the connection failed.

Tries to connect to a remote address. Yields an IO::TimeoutError or an Socket::ConnectError error if the connection failed.

Returns the handle associated with this socket from the operating system.

The returned system socket has been configured as per the IO system runtime requirements. If the returned socket must be in a specific mode or have a specific set of flags set, then they must be applied, even when it feels redundant, because even the same target isn't guaranteed to have the same requirements at runtime.

Finalizes the socket resource.

This involves releasing the handle to the operating system, i.e. closing it. It does not implicitly call #flush, so data waiting in the buffer may be lost. By default write buffering is disabled, though (sync? == true). It's recommended to always close the socket explicitly via #close.

This method is a no-op if the file descriptor has already been closed.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

WARNING The behavior of SO_LINGER is platform specific. Bad things may happen especially with nonblocking sockets. See Cross-Platform Testing of SO_LINGER by Nybek for more information.

Tells the previously bound socket to listen for incoming connections.

Tries to listen for connections on the previously bound socket. Yields an Socket::Error on failure.

The time to wait when reading before raising an IO::TimeoutError.

The time to wait when reading before raising an IO::TimeoutError.

Sets the number of seconds to wait when reading before raising an IO::TimeoutError.

DEPRECATED Use #read_timeout=(Time::Span?) instead.

Receives a binary message from the previously bound address.

Receives a text message from the previously bound address.

Sends a message to the specified remote address. Returns the number of bytes sent. Does not guarantee that the entire message is sent. That's only the case when the return value is equivalent to message.bytesize. #write ensures the entire message is sent but it requires an established connection.

Sends a message to a previously connected remote address. Returns the number of bytes sent. Does not guarantee that the entire message is sent. That's only the case when the return value is equivalent to message.bytesize. #write ensures the entire message is sent.

Returns true if this IO is associated with a terminal device (tty), false otherwise.

IO returns false, but including types may override.

Sets the time to wait when writing before raising an IO::TimeoutError.

Sets the time to wait when writing before raising an IO::TimeoutError.

Sets the number of seconds to wait when writing before raising an IO::TimeoutError.

DEPRECATED Use #write_timeout=(Time::Span?) instead.

**Examples:**

Example 1 (unknown):
```unknown
require "socket"

server = TCPServer.new(2202)
socket = server.accept
socket.puts Time.utc
socket.close
```

Example 2 (julia):
```julia
require "socket"

server = TCPServer.new(2202)
if socket = server.accept?
  socket.puts Time.utc
  socket.close
end
```

Example 3 (julia):
```julia
require "socket"

sock = Socket.tcp(Socket::Family::INET)
sock.bind "localhost", 1234
```

Example 4 (julia):
```julia
require "socket"

sock = Socket.tcp(Socket::Family::INET6)
sock.bind 1234
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/UNIXSocket.html

**Contents:**
- class UNIXSocket
- Overview
- Direct Known Subclasses
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Socket
  - Constructor methods inherited from class Socket
  - Class methods inherited from class Socket

A local interprocess communication clientsocket.

Available on UNIX-like operating systems, and Windows 10 Build 17063 or above. Not all features are supported on Windows.

NOTE To use UNIXSocket, you must explicitly import it with require "socket"

Connects a named UNIX socket, bound to a filesystem pathname.

Creates an UNIXSocket from an existing system file descriptor or socket handle.

Opens an UNIX socket to a filesystem pathname, yields it to the block, then eventually closes the socket when the block returns.

Returns a pair of unnamed UNIX sockets.

Creates a pair of unnamed UNIX sockets (see .pair) and yields them to the block.

Receives a text message from the previously bound address.

Connects a named UNIX socket, bound to a filesystem pathname.

Creates an UNIXSocket from an existing system file descriptor or socket handle.

This adopts the system socket into the IO system that will reconfigure it as per the event loop runtime requirements.

NOTE On Windows, the handle must have been created with WSA_FLAG_OVERLAPPED.

Opens an UNIX socket to a filesystem pathname, yields it to the block, then eventually closes the socket when the block returns.

Returns the value of the block.

Returns a pair of unnamed UNIX sockets.

Not supported on Windows.

Creates a pair of unnamed UNIX sockets (see .pair) and yields them to the block. Eventually closes both sockets when the block returns.

Returns the value of the block.

Not supported on Windows.

Receives a text message from the previously bound address.

**Examples:**

Example 1 (unknown):
```unknown
require "socket"

sock = UNIXSocket.new("/tmp/myapp.sock")
sock.puts "message"
response = sock.gets
sock.close
```

Example 2 (javascript):
```javascript
require "socket"

left, right = UNIXSocket.pair

spawn do
  # echo server
  message = right.gets
  right.puts message
end

left.puts "message"
left.gets # => "message"
```

Example 3 (julia):
```julia
require "socket"

server = Socket.udp(Socket::Family::INET)
server.bind("localhost", 1234)

message, client_addr = server.receive
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Indexable.html

**Contents:**
- module Indexable(T)
- Overview
- Stability guarantees
- Included Modules
- Direct including types
- Defined in:
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Enumerable(T)
  - Class methods inherited from module Enumerable(T)

A container that allows accessing elements via a numeric index.

Indexing starts at 0. A negative index is assumed to be relative to the end of the container: -1 indicates the last element, -2 is the next to last element, and so on.

Types including this module are typically Array-like types.

Several methods in Indexable, such as #bsearch and #cartesian_product, require the collection to be stable; that is, calling #each(&) over and over again should always yield the same elements, provided the collection is not mutated between the calls. In particular, #each(&) itself should not mutate the collection throughout the loop. Stability of an Indexable is guaranteed if the following criteria are met:

The standard library assumes that all including types of Indexable are always stable. It is undefined behavior to implement an Indexable that is not stable or only conditionally stable.

Returns an Array of all ordered combinations of elements taken from each of the indexables as Arrays.

Yields each ordered combination of the elements taken from each of the indexables as Arrays.

Returns an iterator that enumerates the ordered combinations of elements taken from the indexables as Arrays.

Returns the element at the given index.

Returns the element at the given index.

By using binary search, returns the first element for which the passed block returns a truthy value.

By using binary search, returns the index of the first element for which the passed block returns a truthy value.

Returns an Array of all ordered combinations of elements taken from each of self and others as Tuples.

Returns an Array with all possible combinations of size of self.

Traverses the depth of a structure and returns the value, otherwise raises IndexError.

Traverses the depth of a structure and returns the value.

Calls the given block once for each element in self, passing that element as a parameter.

Returns an Iterator for the elements of self.

Calls the given block once for count number of elements in self starting from index start, passing each element as a parameter.

Calls the given block once for all elements at indices within the given range, passing each element as a parameter.

Yields each ordered combination of the elements taken from each of self and others as a Tuple.

Returns an iterator that enumerates the ordered combinations of elements taken from each of self and others as Tuples.

Yields each possible combination of size of self.

Returns an Iterator over each possible combination of size of self.

Calls the given block once for each index in self, passing that index as a parameter.

Returns an Iterator for each index in self.

Calls the given block once for count number of indices in self starting from index start, passing each index as a parameter.

Yields each possible permutation of size of self.

Returns an Iterator over each possible permutation of size of self.

Yields each possible combination with repeated elements of size of self.

Returns an Iterator over each possible combination with repeated elements of size of self.

Returns true if self is empty, false otherwise.

Optimized version of #equals? used when other is also an Indexable.

Determines if self equals other according to a comparison done by the given block.

Returns the element at the given index, if in bounds, otherwise executes the given block with the index and returns its value.

Returns the value at the index given by index, or when not found the value given by default.

Returns the first element in the indexable for which the passed block is truthy, starting from the given offset.

Returns the first element in the indexable for which the passed block is truthy, starting from the given offset.

Returns the first element in the indexable for which the passed block is truthy, starting from the given offset.

Returns the first element in the collection, If the collection is empty, calls the block and returns its value.

See Object#hash(hasher)

Returns the index of the first appearance of object in self starting from the given offset, or nil if object is not in self.

Returns the index of the first object in self for which the block is truthy, starting from the given offset, or nil if no match is found.

Returns the index of the first appearance of obj in self starting from the given offset.

Returns the index of the first object in self for which the block is truthy, starting from the given offset.

Optimized version of Enumerable#join that performs better when all of the elements in this indexable are strings: the total string bytesize to return can be computed before creating the final string, which performs better because there's no need to do reallocations.

Returns the last element of self if it's not empty, or raises IndexError.

Returns the last element of self if it's not empty, or the given block's value.

Returns the last element of self if it's not empty, or nil.

Returns an Array with all possible permutations of size of self.

Returns an Array with all possible combinations with repeated elements of size of self.

Same as #each, but works in reverse.

Returns an Iterator over the elements of self in reverse order.

Returns the index of the last appearance of value in self, or nil if the value is not in self.

Returns the index of the first object in self for which the block is truthy, starting from the last object, or nil if no match is found.

Returns the index of the last appearance of value in self, or nil if the value is not in self.

Returns the index of the first object in self for which the block is truthy, starting from the last object, or nil if no match is found.

Returns an Array of n random elements from self, using the given random number generator.

Optimized version of Enumerable#sample that runs in O(1) time.

Returns the number of elements in this container.

Returns an Array with the results of running block against each element of the collection.

Returns the element at the given index, without doing any bounds check.

Returns a Tuple populated with the elements at the given indexes.

Returns an Array of all ordered combinations of elements taken from each of the indexables as Arrays. Traversal of elements starts from the last Indexable. If indexables is empty, the returned product contains exactly one empty Array.

#cartesian_product is preferred over this class method when the quantity of indexables is known in advance.

Yields each ordered combination of the elements taken from each of the indexables as Arrays. Traversal of elements starts from the last Indexable. If indexables is empty, yields an empty Array exactly once.

#each_cartesian is preferred over this class method when the quantity of indexables is known in advance.

By default, a new Array is created and yielded for each combination.

This can be used to prevent many memory allocations when each combination of interest is to be used in a read-only fashion.

Returns an iterator that enumerates the ordered combinations of elements taken from the indexables as Arrays. Traversal of elements starts from the last Indexable. If indexables is empty, the returned iterator produces one empty Array, then stops.

#each_cartesian is preferred over this class method when the quantity of indexables is known in advance.

By default, a new Array is created and returned for each combination.

This can be used to prevent many memory allocations when each combination of interest is to be used in a read-only fashion.

Returns the element at the given index.

Negative indices can be used to start counting from the end of the array. Raises IndexError if trying to access an element outside the array's range.

Returns the element at the given index.

Negative indices can be used to start counting from the end of the array. Returns nil if trying to access an element outside the array's range.

By using binary search, returns the first element for which the passed block returns a truthy value.

If the block returns a falsey value, the element to be found lies behind. If the block returns a truthy value, the element to be found is itself or lies in front.

Binary search needs the collection to be sorted in regards to the search criterion.

Returns nil if the block didn't return a truthy value for any element.

By using binary search, returns the index of the first element for which the passed block returns a truthy value.

If the block returns a falsey value, the element to be found lies behind. If the block returns a truthy value, the element to be found is itself or lies in front.

Binary search needs the collection to be sorted in regards to the search criterion.

Returns nil if the block didn't return a truthy value for any element.

Returns an Array of all ordered combinations of elements taken from each of self and others as Tuples. Traversal of elements starts from the last Indexable argument.

Returns an Array with all possible combinations of size of self.

Traverses the depth of a structure and returns the value, otherwise raises IndexError.

Traverses the depth of a structure and returns the value. Returns nil if not found.

Calls the given block once for each element in self, passing that element as a parameter.

Returns an Iterator for the elements of self.

The returned iterator keeps a reference to self: if the array changes, the returned values of the iterator change as well.

Calls the given block once for count number of elements in self starting from index start, passing each element as a parameter.

Negative indices count backward from the end of the array. (-1 is the last element).

Raises IndexError if the starting index is out of range. Raises ArgumentError if count is a negative number.

Calls the given block once for all elements at indices within the given range, passing each element as a parameter.

Raises IndexError if the starting index is out of range.

Yields each ordered combination of the elements taken from each of self and others as a Tuple. Traversal of elements starts from the last Indexable argument.

Returns an iterator that enumerates the ordered combinations of elements taken from each of self and others as Tuples. Traversal of elements starts from the last Indexable argument.

Yields each possible combination of size of self.

By default, a new array is created and yielded for each combination. If reuse is given, the array can be reused: if reuse is an Array, this array will be reused; if reuse if truthy, the method will create a new array and reuse it. This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns an Iterator over each possible combination of size of self.

By default, a new array is created and returned for each combination. If reuse is given, the array can be reused: if reuse is an Array, this array will be reused; if reuse if truthy, the method will create a new array and reuse it. This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Calls the given block once for each index in self, passing that index as a parameter.

Returns an Iterator for each index in self.

The returned iterator keeps a reference to self. If the array changes, the returned values of the iterator will change as well.

Calls the given block once for count number of indices in self starting from index start, passing each index as a parameter.

Negative indices count backward from the end of the array. (-1 is the last element).

Raises IndexError if the starting index is out of range. Raises ArgumentError if count is a negative number.

Yields each possible permutation of size of self.

By default, a new array is created and yielded for each permutation. If reuse is given, the array can be reused: if reuse is an Array, this array will be reused; if reuse if truthy, the method will create a new array and reuse it. This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns an Iterator over each possible permutation of size of self.

By default, a new array is created and returned for each permutation. If reuse is given, the array can be reused: if reuse is an Array, this array will be reused; if reuse if truthy, the method will create a new array and reuse it. This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Yields each possible combination with repeated elements of size of self.

By default, a new array is created and yielded for each combination. If reuse is given, the array can be reused: if reuse is an Array, this array will be reused; if reuse if truthy, the method will create a new array and reuse it. This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns an Iterator over each possible combination with repeated elements of size of self.

By default, a new array is created and returned for each combination. If reuse is given, the array can be reused: if reuse is an Array, this array will be reused; if reuse if truthy, the method will create a new array and reuse it. This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns true if self is empty, false otherwise.

Optimized version of #equals? used when other is also an Indexable.

Determines if self equals other according to a comparison done by the given block.

If self's size is the same as other's size, this method yields elements from self and other in tandem: if the block returns true for all of them, this method returns true. Otherwise it returns false.

Returns the element at the given index, if in bounds, otherwise executes the given block with the index and returns its value.

Returns the value at the index given by index, or when not found the value given by default.

Returns the first element in the indexable for which the passed block is truthy, starting from the given offset.

Accepts an optional parameter if_none, to set what gets returned if no element is found (defaults to nil).

Returns the first element in the indexable for which the passed block is truthy, starting from the given offset.

Accepts an optional parameter if_none, to set what gets returned if no element is found (defaults to nil).

Returns the first element in the indexable for which the passed block is truthy, starting from the given offset. Raises Enumerable::NotFoundError if there is no element for which the block is truthy.

Returns the first element in the collection, If the collection is empty, calls the block and returns its value.

See Object#hash(hasher)

Returns the index of the first appearance of object in self starting from the given offset, or nil if object is not in self.

Returns the index of the first object in self for which the block is truthy, starting from the given offset, or nil if no match is found.

Returns the index of the first appearance of obj in self starting from the given offset. Raises Enumerable::NotFoundError if obj is not in self.

Returns the index of the first object in self for which the block is truthy, starting from the given offset. Raises Enumerable::NotFoundError if no match is found.

Optimized version of Enumerable#join that performs better when all of the elements in this indexable are strings: the total string bytesize to return can be computed before creating the final string, which performs better because there's no need to do reallocations.

Returns the last element of self if it's not empty, or raises IndexError.

Returns the last element of self if it's not empty, or the given block's value.

Returns the last element of self if it's not empty, or nil.

Returns an Array with all possible permutations of size of self.

Returns an Array with all possible combinations with repeated elements of size of self.

Same as #each, but works in reverse.

Returns an Iterator over the elements of self in reverse order.

Returns the index of the last appearance of value in self, or nil if the value is not in self.

If offset is given, it defines the position to end the search (elements beyond this point are ignored).

Returns the index of the first object in self for which the block is truthy, starting from the last object, or nil if no match is found.

If offset is given, the search starts from that index towards the first elements in self.

Returns the index of the last appearance of value in self, or nil if the value is not in self.

If offset is given, it defines the position to end the search (elements beyond this point are ignored).

Raises Enumerable::NotFoundError if value is not in self.

Returns the index of the first object in self for which the block is truthy, starting from the last object, or nil if no match is found.

If offset is given, the search starts from that index towards the first elements in self.

Raises Enumerable::NotFoundError if no match is found.

Returns an Array of n random elements from self, using the given random number generator. All elements have equal probability of being drawn. Sampling is done without replacement; if n is larger than the size of this collection, the returned Array has the same size as self.

Raises ArgumentError if n is negative.

If self is not empty and n is equal to 1, calls #sample(random) exactly once. Thus, random will be left in a different state compared to the implementation in Enumerable.

Optimized version of Enumerable#sample that runs in O(1) time.

Returns the number of elements in this container.

Returns an Array with the results of running block against each element of the collection.

Returns the element at the given index, without doing any bounds check.

Indexable makes sure to invoke this method with index in 0...size, so converting negative indices to positive ones is not needed here.

Clients never invoke this method directly. Instead, they access elements with #[](index) and #[]?(index).

This method should only be directly invoked if you are absolutely sure the index is in bounds, to avoid a bounds check for a small boost of performance.

Returns a Tuple populated with the elements at the given indexes. Raises IndexError if any index is invalid.

**Examples:**

Example 1 (javascript):
```javascript
Indexable.cartesian_product([[1, 2, 3], [4, 5]]) # => [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
```

Example 2 (julia):
```julia
Indexable.each_cartesian([%w[Alice Bob Carol], [1, 2]]) do |name, n|
  puts "#{n}. #{name}"
end
```

Example 3 (unknown):
```unknown
1. Alice
2. Alice
1. Bob
2. Bob
1. Carol
2. Carol
```

Example 4 (javascript):
```javascript
iter = Indexable.each_cartesian([%w[N S], %w[E W]])
iter.next # => ["N", "E"]
iter.next # => ["N", "W"]
iter.next # => ["S", "E"]
iter.next # => ["S", "W"]
iter.next # => Iterator::Stop::INSTANCE
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Syscall.html

**Contents:**
- module Syscall
- Overview
- Defined in:
- Macro Summary
- Macro Detail

To define system calls open a module and use the def_syscall macro.

To define system calls open a module and use the def_syscall macro. Pass in the system call name, the return type and its arguments. For example:

They can then be called as methods from the Syscall module:

**Examples:**

Example 1 (julia):
```julia
module YourSyscalls
  Syscall.def_syscall pipe2, Int32, pipefd : Int32[2]*, flags : Int32
  Syscall.def_syscall write, Int32, fd : Int32, buf : UInt8*, count : LibC::SizeT
  Syscall.def_syscall read, Int32, fd : Int32, buf : UInt8*, count : LibC::SizeT
  Syscall.def_syscall close, Int32, fd : Int32
end
```

Example 2 (unknown):
```unknown
YourSyscalls.write(1, "Hello!\n".to_unsafe, 7)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OpenSSL/SHA1.html

**Contents:**
- class OpenSSL::SHA1
- Overview
- Defined in:
- Class Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Binds the OpenSSL SHA1 hash functions.

WARNING SHA1 is no longer a cryptographically secure hash, and should not be used in security-related components, like password hashing. For passwords, see Crypto::Bcrypt::Password. For a generic cryptographic hash, use SHA-256 via OpenSSL::Digest.new("SHA256").

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/JSON/Serializable.html

**Contents:**
- module JSON::Serializable
- Overview
  - Example
  - Usage
  - Extensions: JSON::Serializable::Strict and JSON::Serializable::Unmapped.
  - Class annotation JSON::Serializable::Options
  - Discriminator field
  - after_initialize method
- Defined in:
- Macro Summary

The JSON::Serializable module automatically generates methods for JSON serialization when included.

Including JSON::Serializable will create #to_json and self.from_json methods on the current class, and a constructor which takes a JSON::PullParser. By default, these methods serialize into a json object containing the value of every instance variable, the keys being the instance variable name. Most primitives and collections supported as instance variable values (string, integer, array, hash, etc.), along with objects which define to_json and a constructor taking a JSON::PullParser. Union types are also supported, including unions with nil. If multiple types in a union parse correctly, it is undefined which one will be chosen.

To change how individual instance variables are parsed and serialized, the annotation JSON::Field can be placed on the instance variable. Annotating property, getter and setter macros is also allowed.

JSON::Field properties:

Deserialization also respects default values of variables:

NOTE JSON::Serializable defines an internal constructor on any including type, which means the default constructor (def initialize; end) is absent unless explicitly defined by the user, even when all instance variables have a default initializer.

If the JSON::Serializable::Strict module is included, unknown properties in the JSON document will raise a parse exception. By default the unknown properties are silently ignored. If the JSON::Serializable::Unmapped module is included, unknown properties in the JSON document will be stored in a Hash(String, JSON::Any). On serialization, any keys inside json_unmapped will be serialized and appended to the current json object.

supported properties:

A very common JSON serialization strategy for handling different objects under a same hierarchy is to use a discriminator field. For example in GeoJSON each object has a "type" field, and the rest of the fields, and their meaning, depend on its value.

You can use JSON::Serializable.use_json_discriminator for this use case.

#after_initialize is a method that runs after an instance is deserialized from JSON. It can be used as a hook to post-process the initialized object.

Tells this class to decode JSON by using a field as a discriminator.

Tells this class to decode JSON by using a field as a discriminator.

**Examples:**

Example 1 (json):
```json
require "json"

class Location
  include JSON::Serializable

  @[JSON::Field(key: "lat")]
  property latitude : Float64

  @[JSON::Field(key: "lng")]
  property longitude : Float64
end

class House
  include JSON::Serializable
  property address : String
  property location : Location?
end

house = House.from_json(%({"address": "Crystal Road 1234", "location": {"lat": 12.3, "lng": 34.5}}))
house.address  # => "Crystal Road 1234"
house.location # => #<Location:0x10cd93d80 @latitude=12.3, @longitude=34.5>
house.to_json  # => %({"address":"Crystal Road 1234","location":{"lat":12.3,"lng":34.5}})

houses = Array(House).from_json(%([{"address": "Crystal Road 1234", "location": {"lat": 12.3, "lng": 34.5}}]))
houses.size    # => 1
houses.to_json # => %([{"address":"Crystal Road 1234","location":{"lat":12.3,"lng":34.5}}])
```

Example 2 (php):
```php
require "json"

class A
  include JSON::Serializable

  @[JSON::Field(key: "my_key", emit_null: true)]
  getter a : Int32?
end
```

Example 3 (julia):
```julia
require "json"

struct A
  include JSON::Serializable
  @a : Int32
  @b : Float64 = 1.0
end

A.from_json(%<{"a":1}>) # => A(@a=1, @b=1.0)
```

Example 4 (julia):
```julia
require "json"

struct A
  include JSON::Serializable
  include JSON::Serializable::Unmapped
  @a : Int32
end

a = A.from_json(%({"a":1,"b":2})) # => A(@json_unmapped={"b" => 2}, @a=1)
a.json_unmapped["b"].raw.class    # => Int64
a.to_json                         # => %({"a":1,"b":2})
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/BigRational.html

**Contents:**
- struct BigRational
- Overview
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Comparable(BigDecimal)
  - Instance methods inherited from module Comparable(Float)
  - Instance methods inherited from module Comparable(Int)
  - Instance methods inherited from module Comparable(BigRational)

Rational numbers are represented as the quotient of arbitrarily large numerators and denominators. Rationals are canonicalized such that the denominator and the numerator have no common factors, and that the denominator is positive. Zero has the unique representation 0/1.

NOTE To use BigRational, you must explicitly import it with require "big"

It is implemented under the hood with GMP.

Creates a new BigRational.

Creates a new BigRational with num as the numerator and 1 for denominator.

Creates an exact representation of float as rational.

Creates an exact representation of float as rational.

Creates a BigRational from the given num.

Creates a BigRational from the given num.

Raises the rational to the otherth power

Multiplies the rational by (2 ** other)

The comparison operator.

Divides the rational by (2 ** other)

Returns the absolute value of this number.

Prints this number as a String using a customizable format.

Prints to io an unambiguous and information-rich string representation of this object, typically intended for developers.

Returns an unambiguous and information-rich string representation of this object, typically intended for developers.

Returns true if self is an integer.

Returns a new BigRational as 1/r.

Converts self to BigDecimal.

Returns the Float64 representing this rational.

Returns the string representing this rational.

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

Creates a new BigRational.

If denominator is 0, this will raise an exception.

Creates a new BigRational with num as the numerator and 1 for denominator.

Creates an exact representation of float as rational.

Raises ArgumentError if num is not finite.

Creates an exact representation of float as rational.

Creates a BigRational from the given num.

Creates a BigRational from the given num.

Raises the rational to the otherth power

This will raise DivisionByZeroError if rational is 0 and other is negative.

Multiplies the rational by (2 ** other)

The comparison operator. Returns 0 if the two objects are equal, a negative number if this object is considered less than other, a positive number if this object is considered greater than other, or nil if the two objects are not comparable.

Subclasses define this method to provide class-specific ordering.

The comparison operator is usually used to sort values:

Divides the rational by (2 ** other)

Returns the absolute value of this number.

Prints this number as a String using a customizable format.

separator is used as decimal separator, delimiter as thousands delimiter between batches of group digits.

If decimal_places is nil, all significant decimal places are printed (similar to #to_s). If the argument has a numeric value, the number of visible decimal places will be fixed to that amount.

Trailing zeros are omitted if only_significant is true.

Prints to io an unambiguous and information-rich string representation of this object, typically intended for developers.

It is similar to #to_s(IO), but often provides more information. Ideally, it should contain sufficient information to be able to recreate an object with the same value (given an identical environment).

For types that don't provide a custom implementation of this method, default implementation delegates to #to_s(IO). This said, it is advisable to have an appropriate #inspect implementation on every type. Default implementations are provided by Struct#inspect and Reference#inspect.

::p and ::p! use this method to print an object in STDOUT.

Returns an unambiguous and information-rich string representation of this object, typically intended for developers.

This method should usually not be overridden. It delegates to #inspect(IO) which can be overridden for custom implementations.

Returns true if self is an integer.

Non-integer types may return true as long as self denotes a finite value without any fractional parts.

Returns a new BigRational as 1/r.

This will raise an exception if rational is 0.

Converts self to BigDecimal.

Returns the Float64 representing this rational.

Returns the string representing this rational.

Optionally takes a radix base (2 through 36).

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

This method is called when an object is interpolated in a string literal:

IO#<< calls this method to append an object to itself:

Thus implementations must not interpolate self in a string literal or call io << self which both would lead to an endless loop.

Also see #inspect(IO).

**Examples:**

Example 1 (javascript):
```javascript
require "big"

r = BigRational.new(7.to_big_i, 3.to_big_i)
r.to_s # => "7/3"

r = BigRational.new(3, -9)
r.to_s # => "-1/3"
```

Example 2 (javascript):
```javascript
require "big"

BigRational.new(2, 3) ** 2  # => 4/9
BigRational.new(2, 3) ** -1 # => 3/2
```

Example 3 (javascript):
```javascript
require "big"

BigRational.new(2, 3) << 2 # => 8/3
```

Example 4 (json):
```json
# Sort in a descending way:
[3, 1, 2].sort { |x, y| y <=> x } # => [3, 2, 1]

# Sort in an ascending way:
[3, 1, 2].sort { |x, y| x <=> y } # => [1, 2, 3]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Spec.html

**Contents:**
- module Spec
- Overview
- Focusing on a group of specs
- Randomizing order of specs
- Defined in:
- Class Method Summary
- Class Method Detail

Crystal's built-in testing library. It provides a structure for writing executable examples of how your code should behave. A domain specific language allows you to write them in a way similar to natural language.

The Crystal compiler has a spec command with tools to constrain which examples get run and tailor the output.

A basic spec looks something like this:

Test files are structured by use of the describe or context methods. Typically a top level describe defines the outer unit (such as a class) that is to be tested by the spec. Further describe calls can be nested within the outer unit to specify smaller units under test (such as individual methods). describe can also be used to set up a certain context - think empty Array versus Array with elements. The context method behaves just like the describe method and may be used instead, to emphasize context to the reader.

Within a describe block, concrete test cases are defined with it . A descriptive string is supplied to it describing what the test case tests specifically.

Specs then use the should method to verify that the expected value is returned. See the example above for details.

By convention, specs live in the spec directory of a project. You can compile and run the specs of a project by running crystal spec.

A describe, context or it can be marked with focus: true, like this:

If any such thing is marked with focus: true then only those examples will run.

Specs, by default, run in the order defined, but can be run in a random order by passing --order random to crystal spec.

Specs run in random order will display a seed value upon completion. This seed value can be used to rerun the specs in that same order by passing the seed value to --order.

DEPRECATED This is an internal API.

DEPRECATED This is an internal API.

Instructs the spec runner to execute the given block after each spec in the spec suite.

Instructs the spec runner to execute the given block after the entire spec suite.

Instructs the spec runner to execute the given block when each spec in the spec suite runs.

Instructs the spec runner to execute the given block before each spec in the spec suite.

Instructs the spec runner to execute the given block before the entire spec suite.

DEPRECATED This is an internal API.

DEPRECATED This is an internal API.

DEPRECATED This is an internal API.

DEPRECATED This is an internal API.

DEPRECATED This is an internal API.

Instructs the spec runner to execute the given block after each spec in the spec suite.

If multiple blocks are registered they run in the reversed order that they are given.

will print, just after each spec, 2 and then 1.

Instructs the spec runner to execute the given block after the entire spec suite.

If multiple blocks are registered they run in the reversed order that they are given.

will print, just after the spec suite ends, 2 and then 1.

Instructs the spec runner to execute the given block when each spec in the spec suite runs.

The block must call run on the given Example::Procsy object.

If multiple blocks are registered they run in the reversed order that they are given.

Instructs the spec runner to execute the given block before each spec in the spec suite.

If multiple blocks are registered they run in the order that they are given.

will print, just before each spec, 1 and then 2.

Instructs the spec runner to execute the given block before the entire spec suite.

If multiple blocks are registered they run in the order that they are given.

will print, just before the spec suite starts, 1 and then 2.

DEPRECATED This is an internal API.

DEPRECATED This is an internal API.

DEPRECATED This is an internal API.

**Examples:**

Example 1 (swift):
```swift
require "spec"

describe Array do
  describe "#size" do
    it "correctly reports the number of elements in the Array" do
      [1, 2, 3].size.should eq 3
    end
  end

  describe "#empty?" do
    it "is empty when no elements are in the array" do
      ([] of Int32).empty?.should be_true
    end

    it "is not empty if there are elements in the array" do
      [1].empty?.should be_false
    end
  end

  # lots more specs
end
```

Example 2 (markdown):
```markdown
# Run all specs in files matching spec/**/*_spec.cr
crystal spec

# Run all specs in files matching spec/my/test/**/*_spec.cr
crystal spec spec/my/test/

# Run all specs in spec/my/test/file_spec.cr
crystal spec spec/my/test/file_spec.cr

# Run the spec or group defined in line 14 of spec/my/test/file_spec.cr
crystal spec spec/my/test/file_spec.cr:14

# Run all specs tagged with "fast"
crystal spec --tag 'fast'

# Run all specs not tagged with "slow"
crystal spec --tag '~slow'
```

Example 3 (julia):
```julia
it "adds", focus: true do
  (2 + 2).should_not eq(5)
end
```

Example 4 (css):
```css
Spec.after_each { puts 1 }
Spec.after_each { puts 2 }
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Regex/CompileOptions.html

**Contents:**
- alias Regex::CompileOptions
- Overview
- Alias Definition
- Defined in:

Represents compile options passed to Regex.new.

This alias is supposed to replace Options.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/Server.html

**Contents:**
- class HTTP::Server
- Overview
- Request processing
  - Handler chain
  - Response object
- Binding to sockets
- Server loop
  - Reusing connections
- Defined in:
- Constant Summary

A concurrent HTTP server implementation.

A server is initialized with a handler chain responsible for processing each incoming request.

NOTE To use Server, you must explicitly import it with require "http/server"

The handler chain receives an instance of HTTP::Server::Context that holds the HTTP::Request to process and a HTTP::Server::Response which it can configure and write to.

Each connection is processed concurrently in a separate Fiber and can handle multiple subsequent requests-response cycles with connection keep-alive.

The handler given to a server can simply be a block that receives an HTTP::Server::Context, or it can be an instance of HTTP::Handler. An HTTP::Handler has a #next method to forward processing to the next handler in the chain.

For example, an initial handler might handle exceptions raised from subsequent handlers and return a 500 Server Error status (see HTTP::ErrorHandler). The next handler might log all incoming requests (see HTTP::LogHandler). And the final handler deals with routing and application logic.

The HTTP::Server::Response object has status and headers properties that can be configured before writing the response body. Once any response output has been written, changing the status and headers properties has no effect.

The HTTP::Server::Response is a write-only IO, so all IO methods are available on it for sending the response body.

The server can be bound to one or more server sockets (see #bind)

#bind(uri : URI) and #bind(uri : String) parse socket configuration for one of these types from an URI. This can be useful for injecting plain text configuration values.

Each of these methods returns the Socket::Address that was added to this server.

It is also possible to bind a generic Socket::Server using #bind(socket : Socket::Server) which can be used for custom network protocol configurations.

After defining all server sockets to listen to, the server can be started by calling #listen. This call blocks until the server is closed.

A server can be closed by calling #close. This closes the server sockets and stops processing any new requests, even on connections with keep-alive enabled. Currently processing requests are not interrupted but also not waited for. In order to give them some grace period for finishing, the calling context can add a timeout like sleep 10.seconds after #listen returns.

The request processor supports reusing a connection for subsequent requests. This is used by default for HTTP/1.1 or when requested by the Connection: keep-alive header. This is signalled by this header being set on the HTTP::Server::Response when it's passed into the handler chain.

If in the handler chain this header is overridden to Connection: close, then the connection will not be reused after the request has been processed.

Reusing the connection also requires that the request body (if present) is entirely consumed in the handler chain. Otherwise the connection will be closed.

Creates a new HTTP server with a handler chain constructed from the handlers array and the given block.

Creates a new HTTP server with the given block as handler.

Creates a new HTTP server with the handlers array as handler chain.

Creates a new HTTP server with the given handler.

Builds all handlers as the middleware for HTTP::Server.

Parses a socket configuration from uri and adds it to this server.

Parses a socket configuration from uri and adds it to this server.

Adds a Socket::Server socket to this server.

Creates a TCPServer listening on host:port and adds it as a socket, returning the local address and port the server listens on.

Creates a TCPServer listening on 127.0.0.1:port and adds it as a socket, returning the local address and port the server listens on.

Creates a TCPServer listening on address and adds it as a socket, returning the local address and port the server listens on.

Creates an OpenSSL::SSL::Server and adds it as a socket.

Creates an OpenSSL::SSL::Server and adds it as a socket.

Creates an OpenSSL::SSL::Server and adds it as a socket.

Creates a UNIXServer bound to path and adds it as a socket.

Creates a UNIXServer bound to address and adds it as a socket.

Creates a TCPServer listening on an unused port and adds it as a socket.

Gracefully terminates the server.

Returns true if this server is closed.

Enumerates all addresses this server is bound to.

Creates a TCPServer listening on 127.0.0.1:port, adds it as a socket and starts the server.

Creates a TCPServer listening on host:port, adds it as a socket and starts the server.

Returns true if this server is listening on its sockets.

Returns the maximum permitted combined size for the headers in an HTTP request.

Sets the maximum permitted combined size for the headers in an HTTP request.

Returns the maximum permitted size for the request line in an HTTP request.

Sets the maximum permitted size for the request line in an HTTP request.

Creates a new HTTP server with a handler chain constructed from the handlers array and the given block.

Creates a new HTTP server with the given block as handler.

Creates a new HTTP server with the handlers array as handler chain.

Creates a new HTTP server with the given handler.

Builds all handlers as the middleware for HTTP::Server.

Parses a socket configuration from uri and adds it to this server. Returns the effective address it is bound to.

Parses a socket configuration from uri and adds it to this server. Returns the effective address it is bound to.

Adds a Socket::Server socket to this server.

Creates a TCPServer listening on host:port and adds it as a socket, returning the local address and port the server listens on.

If reuse_port is true, it enables the SO_REUSEPORT socket option, which allows multiple processes to bind to the same port.

Creates a TCPServer listening on 127.0.0.1:port and adds it as a socket, returning the local address and port the server listens on.

If reuse_port is true, it enables the SO_REUSEPORT socket option, which allows multiple processes to bind to the same port.

Creates a TCPServer listening on address and adds it as a socket, returning the local address and port the server listens on.

If reuse_port is true, it enables the SO_REUSEPORT socket option, which allows multiple processes to bind to the same port.

Creates an OpenSSL::SSL::Server and adds it as a socket.

The SSL server wraps a TCPServer listening on host:port.

Creates an OpenSSL::SSL::Server and adds it as a socket.

The SSL server wraps a TCPServer listening on an unused port on host.

Creates an OpenSSL::SSL::Server and adds it as a socket.

The SSL server wraps a TCPServer listening on an unused port on host.

Creates a UNIXServer bound to path and adds it as a socket.

Creates a UNIXServer bound to address and adds it as a socket.

Creates a TCPServer listening on an unused port and adds it as a socket.

Returns the Socket::IPAddress with the determined port number.

Gracefully terminates the server. It will process currently accepted requests, but it won't accept new connections.

Returns true if this server is closed.

Enumerates all addresses this server is bound to.

Creates a TCPServer listening on 127.0.0.1:port, adds it as a socket and starts the server. Blocks until the server is closed.

See #bind(port : Int32) for details.

Creates a TCPServer listening on host:port, adds it as a socket and starts the server. Blocks until the server is closed.

See #bind(host : String, port : Int32) for details.

Starts the server. Blocks until the server is closed.

Returns true if this server is listening on its sockets.

Returns the maximum permitted combined size for the headers in an HTTP request.

When parsing a request, the server keeps track of the amount of total bytes consumed for all headers (including line breaks). If combined byte size of all headers is larger than the permitted size, the server responds with the status code 432 Request Header Fields Too Large (see HTTP::Status::REQUEST_HEADER_FIELDS_TOO_LARGE).

Default: HTTP::MAX_HEADERS_SIZE

Sets the maximum permitted combined size for the headers in an HTTP request.

Returns the maximum permitted size for the request line in an HTTP request.

The request line is the first line of a request, consisting of method, resource and HTTP version and the delimiting line break. If the request line has a larger byte size than the permitted size, the server responds with the status code 414 URI Too Long (see HTTP::Status::URI_TOO_LONG).

Default: HTTP::MAX_REQUEST_LINE_SIZE

Sets the maximum permitted size for the request line in an HTTP request.

**Examples:**

Example 1 (julia):
```julia
require "http/server"

server = HTTP::Server.new do |context|
  context.response.content_type = "text/plain"
  context.response.print "Hello world!"
end

address = server.bind_tcp 8080
puts "Listening on http://#{address}"
server.listen
```

Example 2 (julia):
```julia
require "http/server"

server = HTTP::Server.new([
  HTTP::ErrorHandler.new,
  HTTP::LogHandler.new,
  HTTP::CompressHandler.new,
  HTTP::StaticFileHandler.new("."),
])

server.bind_tcp "127.0.0.1", 8080
server.listen
```

Example 3 (julia):
```julia
require "http/server"

server = HTTP::Server.new do |context|
  context.response.content_type = "text/plain"
  context.response.print "Hello world!"
end

address = server.bind_tcp "0.0.0.0", 8080
puts "Listening on http://#{address}"
server.listen
```

Example 4 (swift):
```swift
require "http/server"

server = HTTP::Server.new { }
server.bind("tcp://localhost:80")                                                  # => Socket::IPAddress.new("127.0.0.1", 8080)
server.bind("unix:///tmp/server.sock")                                             # => Socket::UNIXAddress.new("/tmp/server.sock")
server.bind("tls://127.0.0.1:443?key=private.key&cert=certificate.cert&ca=ca.crt") # => Socket::IPAddress.new("127.0.0.1", 443)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/Format/RFC_2822.html

**Contents:**
- module Time::Format::RFC_2822
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

The RFC 2822 datetime format.

This is also compatible to RFC 882 and RFC 1123.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

**Examples:**

Example 1 (yaml):
```yaml
Time::Format::RFC_2822.format(Time.utc(2016, 2, 15, 4, 35, 50)) # => "Mon, 15 Feb 2016 04:35:50 +0000"

Time::Format::RFC_2822.parse("Mon, 15 Feb 2016 04:35:50 +0000") # => 2016-02-15 04:35:50.0 +00:00
Time::Format::RFC_2822.parse("Mon, 15 Feb 2016 04:35:50 UTC")   # => 2016-02-15 04:35:50Z
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OpenSSL/Cipher.html

**Contents:**
- class OpenSSL::Cipher
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

A class which can be used to encrypt and decrypt data using a specified cipher.

NOTE The ciphers available to an application are determined by the linked version of the system SSL library. A comprehensive list of ciphers can be found in the OpenSSL Cipher documentation.

Sets this cipher to decryption mode.

Sets this cipher to encryption mode.

Outputs the decrypted or encrypted buffer.

How many bytes the iv should be.

How many bytes the key should be.

Sets the iv using Random::Secure.

Sets the key using Random::Secure.

Resets the encrypt/decrypt mode.

Add the data to be encrypted or decrypted to this cipher's buffer.

Sets this cipher to decryption mode.

Sets this cipher to encryption mode.

Outputs the decrypted or encrypted buffer.

How many bytes the iv should be.

How many bytes the key should be.

Sets the iv using Random::Secure.

Sets the key using Random::Secure.

Resets the encrypt/decrypt mode.

Add the data to be encrypted or decrypted to this cipher's buffer.

**Examples:**

Example 1 (julia):
```julia
require "random/secure"
require "openssl"

def encrypt(data, key, iv)
  cipher = OpenSSL::Cipher.new("aes-256-cbc")
  cipher.encrypt
  cipher.key = key
  cipher.iv = iv

  io = IO::Memory.new
  io.write(cipher.update(data))
  io.write(cipher.final)
  io.rewind

  io.to_slice
end

def decrypt(data, key, iv)
  cipher = OpenSSL::Cipher.new("aes-256-cbc")
  cipher.decrypt
  cipher.key = key
  cipher.iv = iv

  io = IO::Memory.new
  io.write(cipher.update(data))
  io.write(cipher.final)
  io.rewind

  io.gets_to_end
end

key = Random::Secure.random_bytes(64) # You can also use OpenSSL::Cipher#random_key to do this same thing
iv = Random::Secure.random_bytes(32)  # You can also use OpenSSL::Cipher#random_iv to do this same thing

encrypted_data = encrypt("Encrypted", key, iv)    # => Bytes[95, 182, 21, 86, 193, 155, 149, 164, 82, 102, 171, 182, 56, 153, 223, 33]
decrypted_data = decrypt(encrypted_data, key, iv) # => "Encrypted"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/FormData.html

**Contents:**
- module HTTP::FormData
- Overview
  - Examples
- Defined in:
- Class Method Summary
- Class Method Detail

Contains utilities for parsing multipart/form-data messages, which are commonly used for encoding HTML form data.

NOTE To use FormData, you must explicitly import it with require "http"

Commonly, you'll want to parse a from response from a HTTP request, and process it. An example server which performs this task is shown below.

To test the server, use the curl command below.

Another common case is sending formdata to a server using HTTP::Client. Here is an example showing how to upload a file to the server above in crystal.

Builds a multipart/form-data message, yielding a FormData::Builder object to the block which writes to response using *boundary.

Builds a multipart/form-data message, yielding a FormData::Builder object to the block which writes to io using boundary.

Parses a multipart/form-data message, yielding a FormData::Part.

Parses a multipart/form-data message, yielding a FormData::Part.

Parses a Content-Disposition header string into a field name and FileMetadata.

Builds a multipart/form-data message, yielding a FormData::Builder object to the block which writes to response using *boundary. Content-Type is set on response and Builder#finish is called on the builder when the block returns.

See: FormData::Builder

Builds a multipart/form-data message, yielding a FormData::Builder object to the block which writes to io using boundary. Builder#finish is called on the builder when the block returns.

See: FormData::Builder

Parses a multipart/form-data message, yielding a FormData::Part.

See: FormData::Parser

Parses a multipart/form-data message, yielding a FormData::Part.

See: FormData::Parser

Parses a Content-Disposition header string into a field name and FileMetadata. Please note that the Content-Disposition header for multipart/form-data is not compatible with the original definition in RFC 2183, but are instead specified in RFC 2388.

**Examples:**

Example 1 (julia):
```julia
require "http"

server = HTTP::Server.new do |context|
  name = nil
  file = nil
  HTTP::FormData.parse(context.request) do |part|
    case part.name
    when "name"
      name = part.body.gets_to_end
    when "file"
      file = File.tempfile("upload") do |file|
        IO.copy(part.body, file)
      end
    end
  end

  unless name && file
    context.response.respond_with_status(:bad_request)
    next
  end

  context.response << file.path
end

server.bind_tcp 8085
server.listen
```

Example 2 (json):
```json
$ curl http://localhost:8085/ -F name=foo -F file=@/path/to/test.file
/tmp/upload.Yxn7cc
```

Example 3 (julia):
```julia
require "http"

IO.pipe do |reader, writer|
  channel = Channel(String).new(1)

  spawn do
    HTTP::FormData.build(writer) do |formdata|
      channel.send(formdata.content_type)

      formdata.field("name", "foo")
      File.open("foo.png") do |file|
        metadata = HTTP::FormData::FileMetadata.new(filename: "foo.png")
        headers = HTTP::Headers{"Content-Type" => "image/png"}
        formdata.file("file", file, metadata, headers)
      end
    end

    writer.close
  end

  headers = HTTP::Headers{"Content-Type" => channel.receive}
  response = HTTP::Client.post("http://localhost:8085/", body: reader, headers: headers)

  puts "Response code #{response.status_code}"
  puts "File path: #{response.body}"
end
```

Example 4 (julia):
```julia
require "http"

io = IO::Memory.new
response = HTTP::Server::Response.new io
HTTP::FormData.build(response, "boundary") do |builder|
  builder.field("foo", "bar")
end
response.close

response.headers["Content-Type"] # => "multipart/form-data; boundary=\"boundary\""
io.to_s                          # => "HTTP/1.1 200 OK\r\nContent-Type: multipart/form-data; boundary=\"boundary\"\r\nContent-Length: 75\r\n\r\n--boundary\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n--boundary--"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/IOBackend.html

**Contents:**
- class Log::IOBackend
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Log::Backend
  - Constructor methods inherited from class Log::Backend
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

A Log::Backend that emits to an IO (defaults to STDOUT).

Emits the entry to the given io.

Writes the entry to this backend.

Emits the entry to the given io. It uses the #formatter to convert.

Writes the entry to this backend.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OAuth2/Session.html

**Contents:**
- class OAuth2::Session
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

An OAuth2 session makes it easy to implement APIs that need to refresh an access token once its expired before executing an HTTP request.

Creates an OAuth2::Session.

Authenticates an HTTP::Client, refreshing the access token if it is expired.

Creates an OAuth2::Session.

Authenticates an HTTP::Client, refreshing the access token if it is expired.

Invoke this method on an HTTP::Client before executing an HTTP request.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Digest.html

**Contents:**
- abstract class Digest
- Overview
- Direct Known Subclasses
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Digest is the base type of hashing algorithms like Digest::MD5, Digest::SHA1, Digest::SHA256, or Digest::SHA512.

A Digest instance holds the state of an ongoing hash calculation. It can receive new data to include in the hash via #update, #<<, or #file. Once all data is included, use #final or #hexfinal to get the hash. This will mark the ongoing calculation as finished. A finished calculation can't receive new data.

A digest.dup.final call may be used to get an intermediate hash value.

Use #reset to reuse the Digest instance for a new calculation.

Reads the io's data and updates the digest with it.

Returns the digest output size in bytes.

Reads the file's content and updates the digest with it.

Puts the final digest output into dst.

Returns the final digest output.

Stores the output digest of #digest_size bytes in dst.

Writes a hexadecimal-encoded digest to dst.

Writes a hexadecimal-encoded digest to IO.

Returns a hexadecimal-encoded digest in a new String.

Resets the state of this object.

Resets the object to it's initial state.

Reads the io's data and updates the digest with it.

Hashes data incrementally.

Reads the io's data and updates the digest with it.

Returns the digest output size in bytes.

Reads the file's content and updates the digest with it.

Puts the final digest output into dst.

Faster than the Bytes allocating version. Use when hashing in loops.

#final or #hexfinal can only be called once and raises FinalizedError on subsequent calls.

NOTE .dup.final(dst) call may be used to get an intermediate hash value.

Returns the final digest output.

#final or #hexfinal can only be called once and raises FinalizedError on subsequent calls.

NOTE .dup.final call may be used to get an intermediate hash value.

Stores the output digest of #digest_size bytes in dst.

Writes a hexadecimal-encoded digest to dst.

Faster than the String allocating version. Use when hashing in loops.

#final or #hexfinal can only be called once and raises FinalizedError on subsequent calls.

NOTE .dup.final call may be used to get an intermediate hash value.

Writes a hexadecimal-encoded digest to IO.

Faster than the String allocating version.

#final or #hexfinal can only be called once and raises FinalizedError on subsequent calls.

NOTE .dup.final call may be used to get an intermediate hash value.

This method is restricted to a maximum digest size of 64 bits. Implementations that allow a larger digest size should override this method to use a larger buffer.

Returns a hexadecimal-encoded digest in a new String.

#final or #hexfinal can only be called once and raises FinalizedError on subsequent calls.

NOTE .dup.hexfinal call may be used to get an intermediate hash value.

Resets the state of this object. Use to get another hash value without creating a new object.

Resets the object to it's initial state.

Reads the io's data and updates the digest with it.

Hashes data incrementally.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Random.html

**Contents:**
- module Random
- Overview
- Direct including types
- Defined in:
- Constant Summary
- Constructors
- Class Method Summary
- Instance Method Summary
- Constructor Detail
- Class Method Detail

Random provides an interface for random values generation, using a pseudo random number generator (PRNG).

The above methods delegate to a Random instance.

This module also defines a global method #rand, which Array#sample and Array#shuffle delegates.

An instance of each class that includes Random is a random number generator with its own state. Usually such RNGs can be initialized with a seed, which defines their initial state. It is guaranteed that after initializing two different instances with the same seed, and then executing the same calls on both of them, you will get the same results. This allows exactly reproducing the same seemingly random events by just keeping the seed.

It is possible to make a custom RNG by including Random and implementing #next_u to return an unsigned number of a pre-determined type (usually UInt32). The numbers generated by your RNG must be uniformly distributed in the whole range of possible values for that type (e.g. 0u32..UInt32::MAX). This allows all other methods of Random to be based on this and still produce uniformly distributed results. Your Random class should also have a way to initialize it. For pseudo-random number generators that will usually be an integer seed, but there are no rigid requirements for the initialization.

The default PRNG is Random::PCG32 which has a good overall statistical distribution (low bias of generated numbers) and is fast for overall usages on different platforms, but isn't cryptographically secure. If a third party has access to some generated numbers, she may deduce incoming numbers, putting your application at risk.

It is recommended to use a secure source, such as Random::Secure, Random::ISAAC or ChaCha20 for anything that needs security, such as online games, identification tokens, salts, initializing a PRNG, ... These PRNG are slower but cryptographically secure, so a third party can't deduce incoming numbers.

Initializes an instance with the given seed and sequence.

Initializes an instance seeded from a system source.

Generates n random bytes that are encoded into base64.

Generates a hexadecimal string based on n random bytes.

Generates a random Bool.

Same as #rand(Int32::MIN..Int32::MAX).

Generates a random unsigned integer.

Generates a random integer which is greater than or equal to 0 and less than max.

Returns a random Float which is greater than or equal to 0 and less than max.

Returns a random Float which is greater than or equal to 0 and less than max.

Returns a random integer in the given range.

Returns a random Float in the given range.

Returns a StaticArray filled with random Int8 values.

Returns a StaticArray filled with random UInt8 values.

Returns a StaticArray filled with random Int16 values.

Returns a StaticArray filled with random UInt16 values.

Returns a StaticArray filled with random Int32 values.

Returns a StaticArray filled with random UInt32 values.

Returns a StaticArray filled with random Int64 values.

Returns a StaticArray filled with random UInt64 values.

Returns a StaticArray filled with random Int128 values.

Returns a StaticArray filled with random UInt128 values.

Returns a random Int8

Returns a random UInt8

Returns a random Int16

Returns a random UInt16

Returns a random Int32

Returns a random UInt32

Returns a random Int64

Returns a random UInt64

Returns a random Int128

Returns a random UInt128

Generates a random Float64 between 0 and 1.

Generates a slice filled with n random bytes.

Fills a given slice with random bytes.

Generates n random bytes that are encoded as a URL-safe base64 string.

Initializes an instance with the given seed and sequence.

Initializes an instance seeded from a system source.

Generates n random bytes that are encoded into base64.

The parameter n specifies the length, in bytes, of the random number to be generated. The length of the result string is about 4/3 of n due to the base64 encoding. The result receives a padding consisting of = characters to fill up the string size to a multiple of 4.

Check Base64#strict_encode for details.

It is recommended to use the secure Random::Secure as a source or another cryptographically quality PRNG such as Random::ISAAC or ChaCha20.

Generates a hexadecimal string based on n random bytes.

The bytes are encoded into a string of two-digit hexadecimal number (00-ff) per byte.

It is recommended to use the secure Random::Secure as a source or another cryptographically quality PRNG such as Random::ISAAC or ChaCha20.

Generates a random Bool.

Same as #rand(Int32::MIN..Int32::MAX).

Generates a random unsigned integer.

The integers must be uniformly distributed between 0 and the maximal value for the chosen type.

Generates a random integer which is greater than or equal to 0 and less than max.

The return type always matches the supplied argument.

Returns a random Float which is greater than or equal to 0 and less than max.

Returns a random Float which is greater than or equal to 0 and less than max.

Returns a random integer in the given range.

The return type always matches the supplied argument.

Returns a random Float in the given range.

Returns a StaticArray filled with random Int8 values.

Returns a StaticArray filled with random UInt8 values.

Returns a StaticArray filled with random Int16 values.

Returns a StaticArray filled with random UInt16 values.

Returns a StaticArray filled with random Int32 values.

Returns a StaticArray filled with random UInt32 values.

Returns a StaticArray filled with random Int64 values.

Returns a StaticArray filled with random UInt64 values.

Returns a StaticArray filled with random Int128 values.

Returns a StaticArray filled with random UInt128 values.

Returns a random Int8

Returns a random UInt8

Returns a random Int16

Returns a random UInt16

Returns a random Int32

Returns a random UInt32

Returns a random Int64

Returns a random UInt64

Returns a random Int128

Returns a random UInt128

Generates a random Float64 between 0 and 1.

Generates a slice filled with n random bytes.

Fills a given slice with random bytes.

Generates n random bytes that are encoded as a URL-safe base64 string.

The parameter n specifies the length, in bytes, of the random number to be generated. The length of the result string is about 4/3 of n due to the base64 encoding. If padding is true, the result receives a padding consisting of = characters to fill up the string size to a multiple of 4.

Check Base64#urlsafe_encode for details.

It is recommended to use the secure Random::Secure as a source or another cryptographically quality PRNG such as Random::ISAAC or ChaCha20.

**Examples:**

Example 1 (javascript):
```javascript
Random.rand    # => 0.167595
Random.rand(5) # => 2
```

Example 2 (javascript):
```javascript
r = Random.new
r.rand      # => 0.0372991
r.next_bool # => true
r.next_int  # => 2223112
```

Example 3 (javascript):
```javascript
rand     # => 0.293829
rand(10) # => 8
```

Example 4 (yaml):
```yaml
Random::Secure.base64(4) # => "fK1eYg=="
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Int.html

**Contents:**
- abstract struct Int
- Overview
- Included Modules
- Direct Known Subclasses
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Comparable(BigDecimal)
  - Instance methods inherited from module Comparable(BigRational)
  - Instance methods inherited from module Comparable(BigInt)

Int is the base type of all integer types.

There are four signed integer types: Int8, Int16, Int32 and Int64, being able to represent numbers of 8, 16, 32 and 64 bits respectively. There are four unsigned integer types: UInt8, UInt16, UInt32 and UInt64.

An integer literal is an optional #+ or #- sign, followed by a sequence of digits and underscores, optionally followed by a suffix. If no suffix is present, the literal's type is Int32, or Int64 if the number doesn't fit into an Int32:

Literals without a suffix that are larger than Int64::MAX represent a UInt64 if the number fits, e.g. 9223372036854775808 and 0x80000000_00000000. This behavior is deprecated and will become an error in the future.

The underscore _ before the suffix is optional.

Underscores can be used to make some numbers more readable:

Binary numbers start with 0b:

Octal numbers start with 0o:

Hexadecimal numbers start with 0x:

See Integer literals in the language reference.

Reads an integer from the given io in the given format.

Returns self modulo other.

Returns the value of raising self to the power of exponent.

Returns the value of raising self to the power of exponent.

Returns the value of raising self to the power of exponent.

Divides self by other using floored division.

Returns the result of shifting this number's bits count positions to the left.

The comparison operator.

Returns the result of shifting this number's bits count positions to the right.

Returns the absolute value of this number.

Returns this number's bitth bit, starting with the least-significant.

Returns the number of bits of this int value.

Returns the requested range of bits

Returns true if all bits in mask are set on self.

Returns a Char that has the unicode codepoint of self.

Returns a Time::Span of self days.

Returns a Time::Span of self days.

Returns the digits of a number in a given base.

Calls the given block with each integer value from self down to #to.

Get an iterator for counting down from self to #to.

Returns the greatest common divisor of self and other.

Returns the greatest common divisor of self and other.

Returns a Time::Span of self hours.

Returns a Time::Span of self hours.

Prints this integer as a binary value in a human-readable format using a BinaryPrefixFormat.

Prints this integer as a binary value in a human-readable format using a BinaryPrefixFormat.

Returns true if self is an integer.

Returns the least common multiple of self and other.

Returns the least common multiple of self and other.

Returns a Time::Span of self microseconds.

Returns a Time::Span of self microseconds.

Returns a Time::Span of self milliseconds.

Returns a Time::Span of self milliseconds.

Returns a Time::Span of self minutes.

Returns a Time::Span of self minutes.

Returns a Time::MonthSpan of self months.

Returns a Time::MonthSpan of self months.

Returns a Time::Span of self nanoseconds.

Returns a Time::Span of self nanoseconds.

Counts 1-bits in the binary representation of this integer.

Returns self remainder other.

Rounds self to an integer value using rounding mode.

Returns a Time::Span of self seconds.

Returns a Time::Span of self seconds.

Divides self by other using truncated division.

Converts self to BigDecimal.

Returns a BigInt representing this integer.

Returns a BigRational representing this integer.

Writes this integer to the given io in the given format.

Appends a string representation of this integer to the given io.

Returns a string representation of this integer.

Returns the number of trailing 0-bits.

Returns a Time::Span of self weeks.

Returns a Time::Span of self weeks.

Returns a Time::MonthSpan of self years.

Returns a Time::MonthSpan of self years.

Reads an integer from the given io in the given format.

See also: IO#read_bytes.

Returns self modulo other.

This uses floored division.

See Int#/ for more details.

Returns the value of raising self to the power of exponent.

Raises ArgumentError if exponent is negative: if this is needed, either use a float base or a float exponent.

Intermediate multiplication will wrap around silently in case of overflow.

Returns the value of raising self to the power of exponent.

Raises ArgumentError if exponent is negative: if this is needed, either use a float base or a float exponent.

Raises OverflowError in case of overflow.

Returns the value of raising self to the power of exponent.

Divides self by other using floored division.

In floored division, given two integers x and y:

Raises if other is zero, or if other is -1 and self is signed and is the minimum value for that integer type.

Returns the result of shifting this number's bits count positions to the left.

The comparison operator. Returns 0 if the two objects are equal, a negative number if this object is considered less than other, a positive number if this object is considered greater than other, or nil if the two objects are not comparable.

Subclasses define this method to provide class-specific ordering.

The comparison operator is usually used to sort values:

Returns the result of shifting this number's bits count positions to the right. Also known as arithmetic right shift.

Returns the absolute value of this number.

Returns this number's bitth bit, starting with the least-significant.

Returns the number of bits of this int value.

“The number of bits” means that the bit position of the highest bit which is different to the sign bit. (The bit position of the bit 2**n is n+1.) If there is no such bit (zero or minus one), zero is returned.

I.e. This method returns ceil(log2(self < 0 ? -self : self + 1)).

Returns the requested range of bits

Returns true if all bits in mask are set on self.

Returns a Char that has the unicode codepoint of self.

Raises ArgumentError if this integer's value doesn't fit a char's range (0..0xd7ff and 0xe000..0x10ffff).

Returns a Time::Span of self days.

Returns a Time::Span of self days.

Returns the digits of a number in a given base. The digits are returned as an array with the least significant digit as the first array element.

Calls the given block with each integer value from self down to #to.

Get an iterator for counting down from self to #to.

Returns the greatest common divisor of self and other. Signed integers may raise OverflowError if either has value equal to MIN of its type.

Returns the greatest common divisor of self and other.

Returns a Time::Span of self hours.

Returns a Time::Span of self hours.

Prints this integer as a binary value in a human-readable format using a BinaryPrefixFormat.

Values with binary measurements such as computer storage (e.g. RAM size) are typically expressed using unit prefixes based on 1024 (instead of multiples of 1000 as per SI standard). This method by default uses the IEC standard prefixes (Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi, Ri, Qi) based on powers of 1000 (see BinaryPrefixFormat::IEC).

format can be set to use the extended range of JEDEC units (K, M, G, T, P, E, Z, Y, R, Q) which equals to the prefixes of the SI system except for uppercase K and is based on powers of 1024 (see BinaryPrefixFormat::JEDEC).

See Number#humanize for more details on the behaviour and arguments.

Prints this integer as a binary value in a human-readable format using a BinaryPrefixFormat.

Values with binary measurements such as computer storage (e.g. RAM size) are typically expressed using unit prefixes based on 1024 (instead of multiples of 1000 as per SI standard). This method by default uses the IEC standard prefixes (Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi, Ri, Qi) based on powers of 1000 (see BinaryPrefixFormat::IEC).

format can be set to use the extended range of JEDEC units (K, M, G, T, P, E, Z, Y, R, Q) which equals to the prefixes of the SI system except for uppercase K and is based on powers of 1024 (see BinaryPrefixFormat::JEDEC).

See Number#humanize for more details on the behaviour and arguments.

Returns true if self is an integer.

Non-integer types may return true as long as self denotes a finite value without any fractional parts.

Always returns true for Int.

Returns the least common multiple of self and other.

Returns the least common multiple of self and other.

Raises OverflowError in case of overflow.

Returns a Time::Span of self microseconds.

Returns a Time::Span of self microseconds.

Returns a Time::Span of self milliseconds.

Returns a Time::Span of self milliseconds.

Returns a Time::Span of self minutes.

Returns a Time::Span of self minutes.

Returns a Time::MonthSpan of self months.

Returns a Time::MonthSpan of self months.

Returns a Time::Span of self nanoseconds.

Returns a Time::Span of self nanoseconds.

Counts 1-bits in the binary representation of this integer.

Returns self remainder other.

This uses truncated division.

See Int#tdiv for more details.

Rounds self to an integer value using rounding mode.

The rounding mode controls the direction of the rounding. The default is RoundingMode::TIES_EVEN which rounds to the nearest integer, with ties (fractional value of 0.5) being rounded to the even neighbor (Banker's rounding).

Returns a Time::Span of self seconds.

Returns a Time::Span of self seconds.

Divides self by other using truncated division.

In truncated division, given two integers x and y:

Raises if other is 0, or if other is -1 and self is signed and is the minimum value for that integer type.

Converts self to BigDecimal.

Returns a BigInt representing this integer.

Returns a BigRational representing this integer.

Writes this integer to the given io in the given format.

See also: IO#write_bytes.

Appends a string representation of this integer to the given io.

base specifies the radix of the written string, and must be either 62 or a number between 2 and 36. By default, digits above 9 are represented by ASCII lowercase letters (a for 10, b for 11, etc.), but uppercase letters may be used if upcase is true, unless base 62 is used. In that case, lowercase letters are used for 10 to 35, and uppercase ones for 36 to 61, and upcase must be false.

precision specifies the minimum number of digits in the written string. If there are fewer digits than this number, the string is left-padded by zeros. If self and precision are both zero, returns an empty string.

Returns a string representation of this integer.

base specifies the radix of the returned string, and must be either 62 or a number between 2 and 36. By default, digits above 9 are represented by ASCII lowercase letters (a for 10, b for 11, etc.), but uppercase letters may be used if upcase is true, unless base 62 is used. In that case, lowercase letters are used for 10 to 35, and uppercase ones for 36 to 61, and upcase must be false.

precision specifies the minimum number of digits in the returned string. If there are fewer digits than this number, the string is left-padded by zeros. If self and precision are both zero, returns an empty string.

Returns the number of trailing 0-bits.

Returns a Time::Span of self weeks.

Returns a Time::Span of self weeks.

Returns a Time::MonthSpan of self years.

Returns a Time::MonthSpan of self years.

**Examples:**

Example 1 (unknown):
```unknown
1 # Int32

1_i8  # Int8
1_i16 # Int16
1_i32 # Int32
1_i64 # Int64

1_u8  # UInt8
1_u16 # UInt16
1_u32 # UInt32
1_u64 # UInt64

+10 # Int32
-20 # Int32

2147483648 # Int64
```

Example 2 (unknown):
```unknown
1_000_000 # better than 1000000
```

Example 3 (unknown):
```unknown
0b1101 # == 13
```

Example 4 (unknown):
```unknown
0o123 # == 83
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/String/RawConverter.html

**Contents:**
- module String::RawConverter
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

Converter to be used with JSON::Serializable to read the raw value of a JSON object property as a String.

It can be useful to read ints and floats without losing precision, or to read an object and deserialize it later based on some condition.

**Examples:**

Example 1 (json):
```json
require "json"

class Raw
  include JSON::Serializable

  @[JSON::Field(converter: String::RawConverter)]
  property value : String
end

raw = Raw.from_json(%({"value": 123456789876543212345678987654321}))
raw.value   # => "123456789876543212345678987654321"
raw.to_json # => %({"value":123456789876543212345678987654321})
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/BigInt.html

**Contents:**
- struct BigInt
- Overview
- Included Modules
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Comparable(Float)
  - Instance methods inherited from module Comparable(BigInt)
  - Instance methods inherited from module Comparable(UInt128 | UInt16 | UInt32 | UInt64 | UInt8)

A BigInt can represent arbitrarily large integers.

It is implemented under the hood with GMP.

NOTE To use BigInt, you must explicitly import it with require "big"

Creates a BigInt with the value denoted by str in the given base.

Creates a BigInt from the given num.

Returns a read-only Slice of the limbs that make up this integer, which is effectively abs.digits(2 ** N) where N is the number of bits in LibGMP::MpLimb, except that an empty Slice is returned for zero.

Returns a read-only Slice of the limbs that make up this integer, which is effectively abs.digits(2 ** N) where N is the number of bits in LibGMP::MpLimb, except that an empty Slice is returned for zero.

Returns a read-only Slice of the limbs that make up this integer, which is effectively abs.digits(2 ** N) where N is the number of bits in LibGMP::MpLimb, except that an empty Slice is returned for zero.

Returns a read-only Slice of the limbs that make up this integer, which is effectively abs.digits(2 ** N) where N is the number of bits in LibGMP::MpLimb, except that an empty Slice is returned for zero.

Creates a BigInt with the value zero.

Returns self modulo other.

Returns the value of raising self to the power of exponent.

Returns the result of shifting this number's bits count positions to the left.

Returns the result of shifting this number's bits count positions to the right.

Returns the absolute value of this number.

Returns the number of bits of this int value.

Returns the digits of a number in a given base.

Returns the greatest common divisor of self and other.

Returns the greatest common divisor of self and other.

Returns the least common multiple of self and other.

Returns the least common multiple of self and other.

Counts 1-bits in the binary representation of this integer.

Returns self remainder other.

Divides self by other using truncated division.

Converts self to BigDecimal.

Returns a BigInt representing this integer.

Returns a BigRational representing this integer.

Appends a string representation of this integer to the given io.

Returns a string representation of this integer.

Returns the number of trailing 0-bits.

Creates a BigInt with the value denoted by str in the given base.

Raises ArgumentError if the string doesn't denote a valid integer.

Creates a BigInt from the given num.

Returns a read-only Slice of the limbs that make up this integer, which is effectively abs.digits(2 ** N) where N is the number of bits in LibGMP::MpLimb, except that an empty Slice is returned for zero.

This assumes GMP wasn't built with its experimental nails support: https://gmplib.org/manual/Low_002dlevel-Functions

Returns a read-only Slice of the limbs that make up this integer, which is effectively abs.digits(2 ** N) where N is the number of bits in LibGMP::MpLimb, except that an empty Slice is returned for zero.

This assumes GMP wasn't built with its experimental nails support: https://gmplib.org/manual/Low_002dlevel-Functions

Returns a read-only Slice of the limbs that make up this integer, which is effectively abs.digits(2 ** N) where N is the number of bits in LibGMP::MpLimb, except that an empty Slice is returned for zero.

This assumes GMP wasn't built with its experimental nails support: https://gmplib.org/manual/Low_002dlevel-Functions

Returns a read-only Slice of the limbs that make up this integer, which is effectively abs.digits(2 ** N) where N is the number of bits in LibGMP::MpLimb, except that an empty Slice is returned for zero.

This assumes GMP wasn't built with its experimental nails support: https://gmplib.org/manual/Low_002dlevel-Functions

Returns num. Useful for generic code that does T.new(...) with T being a Number.

Creates a BigInt with the value zero.

Returns self modulo other.

This uses floored division.

See Int#/ for more details.

Returns the value of raising self to the power of exponent.

Raises ArgumentError if exponent is negative: if this is needed, either use a float base or a float exponent.

Raises OverflowError in case of overflow.

Returns the result of shifting this number's bits count positions to the left.

Returns the result of shifting this number's bits count positions to the right. Also known as arithmetic right shift.

Returns the absolute value of this number.

Returns the number of bits of this int value.

“The number of bits” means that the bit position of the highest bit which is different to the sign bit. (The bit position of the bit 2**n is n+1.) If there is no such bit (zero or minus one), zero is returned.

I.e. This method returns ceil(log2(self < 0 ? -self : self + 1)).

Returns the digits of a number in a given base. The digits are returned as an array with the least significant digit as the first array element.

Returns the greatest common divisor of self and other.

Returns the greatest common divisor of self and other.

Returns the least common multiple of self and other.

Returns the least common multiple of self and other.

Counts 1-bits in the binary representation of this integer.

Returns self remainder other.

This uses truncated division.

See Int#tdiv for more details.

Divides self by other using truncated division.

In truncated division, given two integers x and y:

Raises if other is 0, or if other is -1 and self is signed and is the minimum value for that integer type.

Converts self to BigDecimal.

Returns a BigInt representing this integer.

Returns a BigRational representing this integer.

Appends a string representation of this integer to the given io.

base specifies the radix of the written string, and must be either 62 or a number between 2 and 36. By default, digits above 9 are represented by ASCII lowercase letters (a for 10, b for 11, etc.), but uppercase letters may be used if upcase is true, unless base 62 is used. In that case, lowercase letters are used for 10 to 35, and uppercase ones for 36 to 61, and upcase must be false.

precision specifies the minimum number of digits in the written string. If there are fewer digits than this number, the string is left-padded by zeros. If self and precision are both zero, returns an empty string.

Returns a string representation of this integer.

base specifies the radix of the returned string, and must be either 62 or a number between 2 and 36. By default, digits above 9 are represented by ASCII lowercase letters (a for 10, b for 11, etc.), but uppercase letters may be used if upcase is true, unless base 62 is used. In that case, lowercase letters are used for 10 to 35, and uppercase ones for 36 to 61, and upcase must be false.

precision specifies the minimum number of digits in the returned string. If there are fewer digits than this number, the string is left-padded by zeros. If self and precision are both zero, returns an empty string.

Returns the number of trailing 0-bits.

**Examples:**

Example 1 (javascript):
```javascript
require "big"

BigInt.new("123456789123456789123456789123456789") # => 123456789123456789123456789123456789
BigInt.new("123_456_789_123_456_789_123_456_789")  # => 123456789123456789123456789
BigInt.new("1234567890ABCDEF", base: 16)           # => 1311768467294899695
```

Example 2 (javascript):
```javascript
require "big"

BigInt.new # => 0
```

Example 3 (javascript):
```javascript
2 ** 3  # => 8
2 ** 0  # => 1
2 ** -1 # ArgumentError
```

Example 4 (javascript):
```javascript
8000 << 1  # => 16000
8000 << 2  # => 32000
8000 << 32 # => 0
8000 << -1 # => 4000
```

---

## Continuous Integration¶

**URL:** https://crystal-lang.org/reference/1.18/guides/ci/index.html

**Contents:**
- Continuous Integration¶
- The example application¶
- Continuous Integration step by step¶

The ability of having immediate feedback on what we are working should be one of the most important characteristics in software development. Imagine making one change to our source code and having to wait 2 weeks to see if it broke something? oh! That would be a nightmare! For this, Continuous Integration will help a team to have immediate and frequent feedback about the status of what they are building.

Martin Fowler defines Continuous Integration as a software development practice where members of a team integrate their work frequently, usually each person integrates at least daily - leading to multiple integrations per day. Each integration is verified by an automated build (including test) to detect integration errors as quickly as possible. Many teams find that this approach leads to significantly reduced integration problems and allows a team to develop cohesive software more rapidly.

In the next subsections, we are going to present two continuous integration tools: GitHub Actions and Circle CI, and use them with a Crystal example application.

These tools not only will let us build and test our code each time the source has changed but also deploy the result (if the build was successful) or use automatic builds, and maybe test against different platforms, to mention a few.

We are going to use Conway's Game of Life as the example application. More precisely, we are going to use only the first iterations in Conway's Game of Life Kata solution using TDD.

Note that we won't be using TDD in the example itself, but we will mimic as if the example code is the result of the first iterations.

Another important thing to mention is that we are using crystal init to create the application.

And here's the implementation:

And this is all we need for our continuous integration examples! Let's start!

Here's the list of items we want to achieve:

From here choose your next steps:

**Examples:**

Example 1 (python):
```python
class Location
  getter x : Int32
  getter y : Int32

  def self.random
    Location.new(Random.rand(10), Random.rand(10))
  end

  def initialize(@x, @y)
  end
end

class World
  @living_cells : Array(Location)

  def self.empty
    new
  end

  def initialize(living_cells = [] of Location)
    @living_cells = living_cells
  end

  def set_living_at(a_location)
    @living_cells << a_location
  end

  def is_empty?
    @living_cells.size == 0
  end
end
```

Example 2 (swift):
```swift
require "./spec_helper"

describe "a new world" do
  it "should be empty" do
    world = World.new
    world.is_empty?.should be_true
  end
end

describe "an empty world" do
  it "should not be empty after adding a cell" do
    world = World.empty
    world.set_living_at(Location.random)
    world.is_empty?.should be_false
  end
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/Server/Response.html

**Contents:**
- class HTTP::Server::Response
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class IO
  - Class methods inherited from class IO
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

The response to configure and write to in an HTTP::Server handler.

The response #status and #headers must be configured before writing the response body. Once response output is written, changing the #status and #headers properties has no effect.

The HTTP::Server::Response is a write-only IO, so all IO methods are available in it.

A response can be upgraded with the #upgrade method. Once invoked, headers are written and the connection IO (a socket) is yielded to the given block. This is useful to implement protocol upgrades, such as websockets.

Closes this response, writing headers and body if not done yet.

Returns true if this response has been closed.

Convenience method to set the Content-Length header.

Convenience method to set the Content-Type header.

Convenience method to set cookies, see HTTP::Cookies.

The response headers (HTTP::Headers).

The IO to which output is written.

The IO to which output is written.

Sends a redirect to location.

Sends status and message as response.

Sends status and message as response.

The status code of this response, which must be set before writing the response body.

Convenience method to retrieve the HTTP status code.

Convenience method to set the HTTP status code.

Returns the status message.

Sets the status message.

Upgrades this response, writing headers and yielding the connection IO (a socket) to the given block.

The version of the HTTP::Request that created this response.

Closes this response, writing headers and body if not done yet. This method must be implemented if wrapping the response output.

Returns true if this response has been closed.

Convenience method to set the Content-Length header.

Convenience method to set the Content-Type header.

Convenience method to set cookies, see HTTP::Cookies.

Flushes the output. This method must be implemented if wrapping the response output.

The response headers (HTTP::Headers). These must be set before writing to the response.

The IO to which output is written. This can be changed/wrapped to filter the response body (for example to compress the output).

The IO to which output is written. This can be changed/wrapped to filter the response body (for example to compress the output).

Sends a redirect to location.

The value of location gets encoded with URI.encode.

The status determines the HTTP status code which can be HTTP::Status::FOUND (302) for a temporary redirect or HTTP::Status::MOVED_PERMANENTLY (301) for a permanent redirect.

The response gets closed.

Raises IO::Error if the response is closed or headers were already sent.

Sends status and message as response.

This method calls #reset to remove any previous settings and writes the given status and message to the response IO. Finally, it closes the response.

If message is nil, the default message for status is used provided by HTTP::Status#description.

Raises IO::Error if the response is closed or headers were already sent.

Sends status and message as response.

This method calls #reset to remove any previous settings and writes the given status and message to the response IO. Finally, it closes the response.

If message is nil, the default message for status is used provided by HTTP::Status#description.

Raises IO::Error if the response is closed or headers were already sent.

The status code of this response, which must be set before writing the response body. If not set, the default value is 200 (OK).

Convenience method to retrieve the HTTP status code.

Convenience method to set the HTTP status code.

Returns the status message.

Defaults to description of #status.

Sets the status message.

Upgrades this response, writing headers and yielding the connection IO (a socket) to the given block. This is useful to implement protocol upgrades, such as websockets.

The version of the HTTP::Request that created this response.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/JSON/Token.html

**Contents:**
- class JSON::Token
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Appends a short String representation of this object which includes its class name and its object address.

Appends a short String representation of this object which includes its class name and its object address.

**Examples:**

Example 1 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).to_s # => #<Person:0x10a199f20>
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Socket/Addrinfo/Error.html

**Contents:**
- class Socket::Addrinfo::Error
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class IO::Error
  - Constructor methods inherited from class IO::Error
  - Macros inherited from class IO::Error
  - Instance methods inherited from module SystemError
  - Instance methods inherited from class Exception

DEPRECATED Use .from_os_error instead

DEPRECATED Use .from_os_error instead

DEPRECATED Use #os_error instead

DEPRECATED Use .from_os_error instead

DEPRECATED Use .from_os_error instead

DEPRECATED Use #os_error instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/GC.html

**Contents:**
- module GC
- Defined in:
- Class Method Summary
- Class Method Detail

Allocates and clears size bytes of memory.

Allocates size bytes of pointer-free memory.

Changes the allocated memory size of pointer to size.

Allocates and clears size bytes of memory.

The resulting object may contain pointers and they will be tracked by the GC.

The memory will be automatically deallocated when unreferenced.

Allocates size bytes of pointer-free memory.

The client promises that the resulting object will never contain any pointers.

The memory is not cleared. It will be automatically deallocated when unreferenced.

Changes the allocated memory size of pointer to size. If this can't be done in place, it allocates size bytes of memory and copies the content of pointer to the new location.

If pointer was allocated with .malloc_atomic, the same constraints apply.

The return value is a pointer that may be identical to pointer or different.

WARNING Memory allocated using Pointer.malloc must be reallocated using Pointer#realloc instead.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/FileUtils.html

**Contents:**
- module FileUtils
- Overview
- Extended Modules
- Defined in:
- Instance Method Summary
- Instance Method Detail

NOTE To use FileUtils, you must explicitly import it with require "file_utils"

Changes the current working directory of the process to the given string path.

Changes the current working directory of the process to the given string path and invoked the block, restoring the original working directory when the block exits.

Compares two files filename1 to filename2 to determine if they are identical.

Copies the file src_path to the file or directory dest.

Copies a list of files src to dest.

Copies a file or directory src_path to dest_path.

Creates a hard link dest_path which points to src_path.

Creates a hard link to each path in src_paths inside the dest_dir directory.

Creates a symbolic link dest_path which points to src_path.

Creates a symbolic link to each path in src_paths inside the dest_dir directory.

Like #ln_s(Path | String, Path | String), but overwrites dest_path if it exists and is not a directory or if dest_path/src_path exists.

Creates a symbolic link to each path in src_paths inside the dest_dir directory, ignoring any overwritten paths.

Creates a new directory at the given path.

Creates a new directory at the given paths.

Creates a new directory at the given path, including any non-existing intermediate directories.

Creates a new directory at the given paths, including any non-existing intermediate directories.

Moves src_path to dest_path.

Moves every srcs to dest.

Returns the current working directory.

Deletes the path file given.

Deletes all paths file given.

Deletes a file or directory path.

Deletes a list of files or directories paths.

Deletes a file or directory path.

Deletes a list of files or directories paths.

Removes the directory at the given path.

Removes all directories at the given paths.

Attempts to set the access and modification times of the file named in the path parameter to the value given in time.

Attempts to set the access and modification times of each file given in the paths parameter to the value given in time.

Changes the current working directory of the process to the given string path.

Changes the current working directory of the process to the given string path and invoked the block, restoring the original working directory when the block exits.

NOTE Alias of Dir.cd with block

Compares two files filename1 to filename2 to determine if they are identical. Returns true if content are the same, false otherwise.

NOTE Alias of File.same_content?

Copies the file src_path to the file or directory dest. If dest is a directory, a file with the same basename as src_path is created in dest Permission bits are copied too.

Copies a list of files src to dest. dest must be an existing directory.

Copies a file or directory src_path to dest_path. If src_path is a directory, this method copies all its contents recursively. If dest is a directory, copies src to dest/src.

Creates a hard link dest_path which points to src_path. If dest_path already exists and is a directory, creates a link dest_path/src_path.

Creates a hard link to each path in src_paths inside the dest_dir directory. If dest_dir is not a directory, raises an ArgumentError.

Creates a symbolic link dest_path which points to src_path. If dest_path already exists and is a directory, creates a link dest_path/src_path.

Creates a symbolic link to each path in src_paths inside the dest_dir directory. If dest_dir is not a directory, raises an ArgumentError.

Like #ln_s(Path | String, Path | String), but overwrites dest_path if it exists and is not a directory or if dest_path/src_path exists.

Creates a symbolic link to each path in src_paths inside the dest_dir directory, ignoring any overwritten paths.

If dest_dir is not a directory, raises an ArgumentError.

Creates a new directory at the given path. The linux-style permission mode can be specified, with a default of 777 (0o777).

NOTE Alias of Dir.mkdir

Creates a new directory at the given paths. The linux-style permission mode can be specified, with a default of 777 (0o777).

Creates a new directory at the given path, including any non-existing intermediate directories. The linux-style permission mode can be specified, with a default of 777 (0o777).

NOTE Alias of Dir.mkdir_p

Creates a new directory at the given paths, including any non-existing intermediate directories. The linux-style permission mode can be specified, with a default of 777 (0o777).

Moves src_path to dest_path.

NOTE If src_path and dest_path exist on different mounted filesystems, the file at src_path is copied to dest_path and then removed.

Moves every srcs to dest.

Returns the current working directory.

NOTE Alias of Dir.current

Deletes the path file given.

NOTE Alias of File.delete

Deletes all paths file given.

Deletes a file or directory path. If path is a directory, this method removes all its contents recursively.

Deletes a list of files or directories paths. If one path is a directory, this method removes all its contents recursively.

Deletes a file or directory path. If path is a directory, this method removes all its contents recursively. Ignores all errors.

Deletes a list of files or directories paths. If one path is a directory, this method removes all its contents recursively. Ignores all errors.

Removes the directory at the given path.

NOTE Alias of Dir.rmdir

Removes all directories at the given paths.

Attempts to set the access and modification times of the file named in the path parameter to the value given in time.

If the file does not exist, it will be created.

NOTE Alias of File.touch

Attempts to set the access and modification times of each file given in the paths parameter to the value given in time.

If the file does not exist, it will be created.

**Examples:**

Example 1 (unknown):
```unknown
require "file_utils"

FileUtils.cd("/tmp")
```

Example 2 (javascript):
```javascript
require "file_utils"

FileUtils.cd("/tmp") { Dir.current } # => "/tmp"
```

Example 3 (javascript):
```javascript
require "file_utils"

File.write("file.cr", "1")
File.write("bar.cr", "1")
FileUtils.cmp("file.cr", "bar.cr") # => true
```

Example 4 (javascript):
```javascript
require "file_utils"

File.touch("afile")
File.chmod("afile", 0o600)
FileUtils.cp("afile", "afile_copy")
File.info("afile_copy").permissions.value # => 0o600
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/CSV/Builder.html

**Contents:**
- class CSV::Builder
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

A CSV Builder writes CSV to an IO.

Creates a builder that will write to the given IO.

Yields a CSV::Builder::Row to append a row.

Appends the given values as a single row, and then a newline.

Appends the given values as a single row, and then a newline.

Creates a builder that will write to the given IO.

Yields a CSV::Builder::Row to append a row. A newline is appended to IO after the block exits.

Appends the given values as a single row, and then a newline.

Appends the given values as a single row, and then a newline.

**Examples:**

Example 1 (julia):
```julia
require "csv"

result = CSV.build do |csv|
  # A row can be written by specifying several values
  csv.row "Hello", 1, 'a', "String with \"quotes\"", '"', :sym

  # Or an enumerable
  csv.row [1, 2, 3]

  # Or using a block, and appending to the row
  csv.row do |row|
    # Appending a single value
    row << 4

    # Or multiple values
    row.concat 5, 6

    # Or an enumerable
    row.concat [7, 8]
  end
end
puts result
```

Example 2 (unknown):
```unknown
Hello,1,a,"String with ""quotes""","""",sym
1,2,3
4,5,6,7,8
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/PassManagerBuilder.html

**Contents:**
- class LLVM::PassManagerBuilder
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

DEPRECATED The legacy pass manager was removed in LLVM 17. Use LLVM::PassBuilderOptions instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/RuntimeError.html

**Contents:**
- class RuntimeError
- Overview
- Included Modules
- Extended Modules
- Defined in:
- Macro Summary
  - Instance methods inherited from module SystemError
  - Instance methods inherited from class Exception
  - Constructor methods inherited from class Exception
  - Instance methods inherited from class Reference

Raised when there is an internal runtime error

Builds an instance of the exception from the current system error value (Errno.value).

DEPRECATED Use .from_os_error instead

Builds an instance of the exception from the current windows error value (WinError.value).

Builds an instance of the exception from the current Windows Socket API error value (WinError.wsa_value).

Builds an instance of the exception from the current system error value (Errno.value).

The system message corresponding to the OS error value amends the message. Additional keyword arguments are forwarded to the exception initializer .new_from_os_error.

DEPRECATED Use .from_os_error instead

Builds an instance of the exception from the current windows error value (WinError.value).

The system message corresponding to the OS error value amends the message. Additional keyword arguments are forwarded to the exception initializer .new_from_os_error.

Builds an instance of the exception from the current Windows Socket API error value (WinError.wsa_value).

The system message corresponding to the OS error value amends the message. Additional keyword arguments are forwarded to the exception initializer.

---

## Visibility¶

**URL:** https://crystal-lang.org/reference/1.18/syntax_and_semantics/visibility.html

**Contents:**
- Visibility¶
- Private methods¶
- Private types¶
- Protected methods¶
- Private top-level methods¶
- Private top-level types¶

Methods are public by default: the compiler will always let you invoke them. There is no public keyword for this reason.

Methods can be marked as private or protected.

A private method can only be invoked without a receiver, that is, without something before the dot. The only exception is self as a receiver:

Note that private methods are visible by subclasses:

Private types can only be referenced inside the namespace where they are defined, and never be fully qualified.

private can be used with class, module, lib, enum, alias and constants:

A protected method can only be invoked on:

A protected method can only be invoked from the scope of its class or its descendants. That includes the class scope and bodies of class methods and instance methods of the same type the protected method is defined on, as well as all types including or inherinting that type and all types in that namespace.

A private top-level method is only visible in the current file.

This allows you to define helper methods in a file that will only be known in that file.

A private top-level type is only visible in the current file.

**Examples:**

Example 1 (swift):
```swift
class Person
  private def say(message)
    puts message
  end

  def say_hello
    say "hello"      # OK, no receiver
    self.say "hello" # OK, self is a receiver, but it's allowed.

    other = Person.new
    other.say "hello" # Error, other is a receiver
  end
end
```

Example 2 (php):
```php
class Employee < Person
  def say_bye
    say "bye" # OK
  end
end
```

Example 3 (yaml):
```yaml
class Foo
  private class Bar
  end

  Bar      # OK
  Foo::Bar # Error
end

Foo::Bar # Error
```

Example 4 (yaml):
```yaml
class Foo
  private ONE = 1

  ONE # => 1
end

Foo::ONE # Error
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/URI.html

**Contents:**
- class URI
- Overview
- Resolution and Relativization
- URL Encoding
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference

This class represents a URI reference as defined by RFC 3986: Uniform Resource Identifier (URI): Generic Syntax.

This class provides constructors for creating URI instances from their components or by parsing their string forms and methods for accessing the various components of an instance.

NOTE To use URI, you must explicitly import it with require "uri"

Resolution is the process of resolving one URI against another, base URI. The resulting URI is constructed from components of both URIs in the manner specified by RFC 3986 section 5.2, taking components from the base URI for those not specified in the original. For hierarchical URIs, the path of the original is resolved against the path of the base and then normalized. See #resolve for examples.

Relativization is the inverse of resolution as that it procures an URI that resolves to the original when resolved against the base.

For normalized URIs, the following is true:

This operation is often useful when constructing a document containing URIs that must be made relative to the base URI of the document wherever possible.

This class provides a number of methods for encoding and decoding strings using URL Encoding (also known as Percent Encoding) as defined in RFC 3986 as well as x-www-form-urlencoded.

Each method has two variants, one returns a string, the other writes directly to an IO.

.encode_www_form encodes white space ( ) as +, while .encode_path and .encode_path_segment encode it as %20. The decode methods differ regarding the handling of + characters, respectively.

NOTE URI::Params provides a higher-level API for handling x-www-form-urlencoded serialized data.

Deserializes a URI from YAML, represented as a string.

Deserializes a URI from JSON, represented as a string.

Parses the given raw_url into an URI.

URL-decodes a string and writes the result to io.

URL-decodes string and writes the result to io.

URL-decodes string as x-www-form-urlencoded and writes the result to io.

URL-decodes string as x-www-form-urlencoded.

Returns the default port for the given scheme if known, otherwise returns nil.

URL-encodes string and writes the result to io.

DEPRECATED Use .encode_path instead.

DEPRECATED Use .encode_path instead.

URL-encodes string and writes the result to an IO.

Encodes string so it can be safely placed as a potentially multi-segmented URI path, replacing special characters with URI escape sequences as needed.

Encodes string so it can be safely placed as a potentially multi-segmented URI path, replacing special characters with URI escape sequences as needed.

Encodes string so it can be safely placed inside a URI path segment, replacing special characters (including /) with URI escape sequences as needed.

Encodes string so it can be safely placed inside a URI path segment, replacing special characters (including /) with URI escape sequences as needed.

URL-encodes string as x-www-form-urlencoded and writes the result to io.

URL-encodes string as x-www-form-urlencoded.

Deserializes the given JSON key into a URI

Returns whether given byte is reserved character defined in RFC 3986 §2.2.

Registers the default port for the given scheme.

Returns whether given byte is unreserved character defined in RFC 3986 §2.3.

Unwraps IPv6 address wrapped in square brackets.

Returns true if this reference is the same as other.

Returns true if URI has a scheme specified.

Returns the authority component of this URI.

Returns the authority component of this URI.

Returns the fragment component of the URI.

Sets the fragment component of the URI.

See Object#hash(hasher)

Returns the host component of the URI.

Sets the host component of the URI.

Returns the host part of the URI and unwrap brackets for IPv6 addresses.

Returns a normalized copy of this URI.

Normalizes this URI instance.

Returns true if this URI is opaque.

Returns the password component of the URI.

Sets the password component of the URI.

Returns the path component of the URI.

Sets the path component of the URI.

Returns the port component of the URI.

Sets the port component of the URI.

Returns the query component of the URI.

Sets the query component of the URI.

Returns a URI::Params of the URI#query.

Sets #query to stringified params.

Returns true if URI does not have a scheme specified.

Relativizes uri against this URI.

Returns the concatenation of #path and #query as it would be used as a request target in an HTTP request.

Resolves uri against this URI.

Returns the scheme component of the URI.

Sets the scheme component of the URI.

Serializes this URI to JSON, represented as a string.

Appends a short String representation of this object which includes its class name and its object address.

Serializes this URI to YAML, represented as a string.

Yields the value of #query_params commits any modifications of the URI::Params instance to self.

Returns the user component of the URI.

Sets the user component of the URI.

Returns the user-information component containing the provided username and password.

Deserializes a URI from YAML, represented as a string.

Deserializes a URI from JSON, represented as a string.

Parses the given raw_url into an URI. The raw_url may be relative or absolute.

URL-decodes a string and writes the result to io.

See .decode(string : String, *, plus_to_space : Bool = false) : String for details.

By default, + is decoded literally. If plus_to_space is true, + is decoded as space character (0x20). Percent-encoded values such as %20 and %2B are always decoded as characters with the respective codepoint.

URL-decodes string and writes the result to io.

The block is called for each percent-encoded ASCII character and determines whether the value is to be decoded. When the return value is falsey, the character is decoded. Non-ASCII characters are always decoded.

By default, + is decoded literally. If plus_to_space is true, + is decoded as space character (0x20).

This method enables some customization, but typical use cases can be implemented by either .decode(string : String, *, plus_to_space : Bool = false) : String or .decode_www_form(string : String, *, plus_to_space : Bool = true) : String.

URL-decodes string as x-www-form-urlencoded and writes the result to io.

See self.decode_www_form(string : String, *, plus_to_space : Bool = true) : String for details.

URL-decodes string as x-www-form-urlencoded.

By default, + is decoded as space character (0x20). If plus_to_space is false, + is decoded literally as +. Percent-encoded values such as %20 and %2B are always decoded as characters with the respective codepoint.

Returns the default port for the given scheme if known, otherwise returns nil.

URL-encodes string and writes the result to io.

See .encode(string : String, *, space_to_plus : Bool = false) : String for details.

DEPRECATED Use .encode_path instead.

Reserved and unreserved characters are not escaped, so this only modifies some special characters as well as non-ASCII characters. .reserved? and .unreserved? provide more details on these character classes.

By default, the space character (0x20) is encoded as %20 and + is encoded literally. If space_to_plus is true, space character is encoded as + and + is encoded as %2B:

DEPRECATED Use .encode_path instead.

URL-encodes string and writes the result to an IO.

The block is called for each ascii character (codepoint less than 0x80) and determines whether the value is to be encoded. When the return value is falsey, the character is encoded. Non-ASCII characters are always encoded.

By default, the space character (0x20) is encoded as %20 and + is encoded literally. If space_to_plus is true, space character is encoded as + and + is encoded as %2B.

This method enables some customization, but typical use cases can be implemented by either .encode_path(string : String) : String, .encode_path_segment(string : String) : String or .encode_www_form(string : String, *, space_to_plus : Bool = true) : String.

Encodes string so it can be safely placed as a potentially multi-segmented URI path, replacing special characters with URI escape sequences as needed.

Unreserved characters such as ASCII letters, digits, and the characters _.-~ are not encoded, as well as the character / which represent a segment separator in hierarchical paths (RFC 3986 §3.3).

Encodes string so it can be safely placed as a potentially multi-segmented URI path, replacing special characters with URI escape sequences as needed.

Unreserved characters such as ASCII letters, digits, and the characters _.-~ are not encoded, as well as the character / which represent a segment separator in hierarchical paths (RFC 3986 §3.3).

Encodes string so it can be safely placed inside a URI path segment, replacing special characters (including /) with URI escape sequences as needed.

Unreserved characters such as ASCII letters, digits, and the characters _.-~ are not encoded (see .unreserved?).

Encodes string so it can be safely placed inside a URI path segment, replacing special characters (including /) with URI escape sequences as needed.

Unreserved characters such as ASCII letters, digits, and the characters _.-~ are not encoded (see .unreserved?).

URL-encodes string as x-www-form-urlencoded and writes the result to io.

See .encode_www_form(string : String, *, space_to_plus : Bool = true) for details.

URL-encodes string as x-www-form-urlencoded.

Reserved characters are escaped, unreserved characters are not. .reserved? and .unreserved? provide more details on these character classes.

The encoded string returned from this method can be used as name or value components for a application/x-www-form-urlencoded format serialization. URI::Params provides a higher-level API for this use case.

By default, the space character (0x20) is encoded as + and + is encoded as %2B. If space_to_plus is false, space character is encoded as %20 and '+' is encoded literally.

Deserializes the given JSON key into a URI

NOTE require "uri/json" is required to opt-in to this feature.

Returns whether given byte is reserved character defined in RFC 3986 §2.2.

Reserved characters are ':', '/', '?', '#', '[', ']', '@', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';' and '='.

Registers the default port for the given scheme.

If port is nil, the existing default port for the scheme, if any, will be unregistered.

Returns whether given byte is unreserved character defined in RFC 3986 §2.3.

Unreserved characters are ASCII letters, ASCII digits, _, ., - and ~.

Unwraps IPv6 address wrapped in square brackets.

Everything that is not wrapped in square brackets is returned unchanged.

Returns true if this reference is the same as other. Invokes same?.

Returns true if URI has a scheme specified.

Returns the authority component of this URI. It is formatted as user:pass@host:port with missing parts being omitted.

If the URI does not have any authority information, the result is nil.

Returns the authority component of this URI. It is formatted as user:pass@host:port with missing parts being omitted.

If the URI does not have any authority information, the result is nil.

Returns the fragment component of the URI.

Sets the fragment component of the URI.

See Object#hash(hasher)

Returns the host component of the URI.

Sets the host component of the URI.

Returns the host part of the URI and unwrap brackets for IPv6 addresses.

Returns a normalized copy of this URI.

See #normalize! for details.

Normalizes this URI instance.

The following normalizations are applied to the individual components (if available):

Returns true if this URI is opaque.

A URI is considered opaque if it has a #scheme but no hierarchical part, i.e. no #host and the first character of #path is not a slash (/).

Returns the password component of the URI.

Sets the password component of the URI.

Returns the path component of the URI.

Sets the path component of the URI.

Returns the port component of the URI.

Sets the port component of the URI.

Returns the query component of the URI.

Sets the query component of the URI.

Returns a URI::Params of the URI#query.

Sets #query to stringified params.

Returns true if URI does not have a scheme specified.

Relativizes uri against this URI.

An exact copy of uri is returned if

Otherwise a new relative hierarchical URI is constructed with #query and #fragment components from uri and with a path component that describes a minimum-difference relative path from #path to uri's path.

This method is the inverse operation to #resolve (see [Resolution and Relativization](#Resolution and Relativization)).

Returns the concatenation of #path and #query as it would be used as a request target in an HTTP request.

If #path is empty in an hierarchical URI, "/" is used.

Resolves uri against this URI.

If uri is #absolute?, or if this URI is #opaque?, then an exact copy of uri is returned.

Otherwise the URI is resolved according to the specifications in RFC 3986 section 5.2.

This method is the inverse operation to #relativize (see [Resolution and Relativization](#Resolution and Relativization)).

Returns the scheme component of the URI.

Sets the scheme component of the URI.

Serializes this URI to JSON, represented as a string.

Appends a short String representation of this object which includes its class name and its object address.

Serializes this URI to YAML, represented as a string.

Yields the value of #query_params commits any modifications of the URI::Params instance to self. Returns the modified URI::Params

Returns the user component of the URI.

Sets the user component of the URI.

Returns the user-information component containing the provided username and password.

The return value is URL encoded (see #encode_www_form).

**Examples:**

Example 1 (markdown):
```markdown
require "uri"

uri = URI.parse "http://foo.com/posts?id=30&limit=5#time=1305298413"
# => #<URI:0x1003f1e40 @scheme="http", @host="foo.com", @port=nil, @path="/posts", @query="id=30&limit=5", ... >
uri.scheme # => "http"
uri.host   # => "foo.com"
uri.query  # => "id=30&limit=5"
uri.to_s   # => "http://foo.com/posts?id=30&limit=5#time=1305298413"
```

Example 2 (javascript):
```javascript
a.relativize(a.resolve(b)) # => b
a.resolve(a.relativize(b)) # => b
```

Example 3 (javascript):
```javascript
require "uri/yaml"

uri = URI.from_yaml(%("http://crystal-lang.org")) # => #<URI:0x1068a7e40 @scheme="http", @host="crystal-lang.org", ... >
uri.scheme                                        # => "http"
uri.host                                          # => "crystal-lang.org"
```

Example 4 (javascript):
```javascript
require "uri/json"

uri = URI.from_json(%("http://crystal-lang.org")) # => #<URI:0x1068a7e40 @scheme="http", @host="crystal-lang.org", ... >
uri.scheme                                        # => "http"
uri.host                                          # => "crystal-lang.org"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OAuth2.html

**Contents:**
- module OAuth2
- Overview
  - Performing HTTP client requests with OAuth2 authentication
  - Obtaining access tokens
- Defined in:

The OAuth module provides an OAuth2::Client as specified by RFC 6749.

NOTE To use OAuth2, you must explicitly import it with require "oauth2"

Assuming you have an access token, you can setup an HTTP::Client to be authenticated with OAuth2 using this code:

This is implemented with HTTP::Client#before_request to add an authorization header to every request.

See OAuth2::Client for an example.

**Examples:**

Example 1 (julia):
```julia
require "http/client"
require "oauth2"

# Here we use a bearer token, but it could be a mac token. We also set the
# expires in value to 172,800 seconds, or 48 hours
access_token = OAuth2::AccessToken::Bearer.new("some_access_token", 172_800)

# Create an HTTP::Client
client = HTTP::Client.new("api.example.com", tls: true)

# Prepare it for using OAuth2 authentication
access_token.authenticate(client)

# Execute requests as usual: they will be authenticated
client.get("/some_path")
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Zip/Reader.html

**Contents:**
- class Compress::Zip::Reader
- Overview
  - Example
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Reads zip file entries sequentially from an IO.

NOTE Entries might not have correct values for crc32, compressed_size, uncompressed_size and comment, because when reading a zip file directly from a stream this information might be stored later in the zip stream. If you need this information, consider using Zip::File.

Creates a new reader from the given io.

Creates a new reader from the given filename.

Creates a new reader from the given io, yields it to the given block, and closes it at the end.

Creates a new reader from the given filename, yields it to the given block, and closes it at the end.

Closes this zip reader.

Returns true if this reader is closed.

Yields each entry in the zip to the given block.

Reads the next entry in the zip, or nil if there are no more entries.

Whether to close the enclosed IO when closing this reader.

Whether to close the enclosed IO when closing this reader.

Creates a new reader from the given io.

Creates a new reader from the given filename.

Creates a new reader from the given io, yields it to the given block, and closes it at the end.

Creates a new reader from the given filename, yields it to the given block, and closes it at the end.

Closes this zip reader.

Returns true if this reader is closed.

Yields each entry in the zip to the given block.

Reads the next entry in the zip, or nil if there are no more entries.

After reading a next entry, previous entries can no longer be read (their IO will be closed.)

Whether to close the enclosed IO when closing this reader.

Whether to close the enclosed IO when closing this reader.

**Examples:**

Example 1 (yaml):
```yaml
require "compress/zip"

Compress::Zip::Reader.open("./file.zip") do |zip|
  zip.each_entry do |entry|
    p entry.filename
    p entry.file?
    p entry.dir?
    p entry.io.gets_to_end
  end
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OpenSSL/Digest.html

**Contents:**
- class OpenSSL::Digest
- Direct Known Subclasses
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Digest
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Returns the digest output size in bytes.

Returns a shallow copy of this object.

Returns the digest output size in bytes.

Returns a shallow copy of this object.

This allocates a new object and copies the contents of self into it.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/UUID/Namespace.html

**Contents:**
- module UUID::Namespace
- Overview
- Defined in:
- Constant Summary

Namespaces as defined per in the RFC 4122 Appendix C.

They are used with the functions v3 amd v5 to generate a UUID based on a name.

A UUID is generated using the provided name, which is assumed to be a fully qualified domain name.

A UUID is generated using the provided name, which is assumed to be an ISO OID.

A UUID is generated using the provided name, which is assumed to be a URL.

A UUID is generated using the provided name, which is assumed to be a X.500 DN in DER or a text output format.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Fiber/ExecutionContext/Parallel.html

**Contents:**
- class Fiber::ExecutionContext::Parallel
- Overview
- Included Modules
- Direct Known Subclasses
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Fiber::ExecutionContext
  - Constructor methods inherited from module Fiber::ExecutionContext
  - Class methods inherited from module Fiber::ExecutionContext

Parallel execution context.

Fibers running in the same context run both concurrently and in parallel to each others, in addition to the other fibers running in other execution contexts.

The context internally keeps a number of fiber schedulers, each scheduler being able to start running on a system thread, so multiple schedulers can run in parallel. The fibers are resumable by any scheduler in the context, they can thus move from one system thread to another at any time.

The actual parallelism is controlled by the execution context. As the need for parallelism increases, for example more fibers running longer, the more schedulers will start (and thus system threads), as the need decreases, for example not enough fibers, the schedulers will pause themselves and parallelism will decrease.

The parallelism can be as low as 1, in which case the context becomes a concurrent context (no parallelism) until resized.

For example: we can start a parallel context to run consumer fibers, while the default context produces values. Because the consumer fibers can run in parallel, we must protect accesses to the shared value variable. Running the example without Atomic#add would produce a different result every time!

Starts a Parallel context with a maximum parallelism.

DEPRECATED Use Fiber::ExecutionContext::Parallel.new(String, Int32) instead.

DEPRECATED Use Fiber::ExecutionContext::Parallel.new(String, Int32) instead.

The maximum number of threads that can be started.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Resizes the context to the new maximum parallelism.

The number of threads that have been started.

Appends a short String representation of this object which includes its class name and its object address.

Starts a Parallel context with a maximum parallelism. The context starts with an initial parallelism of zero. It will grow to one when a fiber is spawned, then the actual parallelism will keep increasing and decreasing as needed, but will never go past the configured maximum.

DEPRECATED Use Fiber::ExecutionContext::Parallel.new(String, Int32) instead.

DEPRECATED Use Fiber::ExecutionContext::Parallel.new(String, Int32) instead.

The maximum number of threads that can be started.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Resizes the context to the new maximum parallelism.

The new maximum can grow, in which case more schedulers are created to eventually increase the parallelism.

The new maximum can also shrink, in which case the overflow schedulers are removed and told to shutdown immediately. The actual shutdown is cooperative, so running schedulers won't stop until their current fiber tries to switch to another fiber.

The number of threads that have been started.

Appends a short String representation of this object which includes its class name and its object address.

**Examples:**

Example 1 (julia):
```julia
require "wait_group"

consumers = Fiber::ExecutionContext::Parallel.new("consumers", 8)
channel = Channel(Int32).new(64)
wg = WaitGroup.new(32)

result = Atomic.new(0)

32.times do
  consumers.spawn do
    while value = channel.receive?
      result.add(value)
    end
  ensure
    wg.done
  end
end

1024.times { |i| channel.send(i) }
channel.close

# wait for all workers to be done
wg.wait

p result.get # => 523776
```

Example 2 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).inspect # => #<Person:0x10fd31f20 @name="John", @age=32>
```

Example 3 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).to_s # => #<Person:0x10a199f20>
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/PassRegistry.html

**Contents:**
- struct LLVM::PassRegistry
- Overview
- Defined in:
- Constant Summary
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object

DEPRECATED The legacy pass manager was removed in LLVM 17. Use LLVM::PassBuilderOptions instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Colorize/ObjectExtensions.html

**Contents:**
- module Colorize::ObjectExtensions
- Direct including types
- Defined in:
- Instance Method Summary
- Instance Method Detail

Wraps self in a Colorize::Object and colors it with the given ColorRGB made up from the given red, green and blue values.

Wraps self in a Colorize::Object and colors it with the given Color256 made up from the single fore byte.

Wraps self in a Colorize::Object and colors it with the given fore color.

Wraps self in a Colorize::Object and colors it with the given fore Color.

Turns self into a Colorize::Object.

Wraps self in a Colorize::Object and colors it with the given ColorRGB made up from the given red, green and blue values.

Wraps self in a Colorize::Object and colors it with the given Color256 made up from the single fore byte.

Wraps self in a Colorize::Object and colors it with the given fore color.

Wraps self in a Colorize::Object and colors it with the given fore Color.

Turns self into a Colorize::Object.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Levenshtein/Finder.html

**Contents:**
- class Levenshtein::Finder
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Finds the closest string to a given string amongst many strings.

**Examples:**

Example 1 (javascript):
```javascript
require "levenshtein"

finder = Levenshtein::Finder.new "hallo"
finder.test "hay"
finder.test "hall"
finder.test "hallo world"

finder.best_match # => "hall"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Iterator.html

**Contents:**
- module Iterator(T)
- Overview
  - Iterating step-by-step
  - Implementing an Iterator
- Included Modules
- Direct including types
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary

An Iterator allows processing sequences lazily, as opposed to Enumerable which processes sequences eagerly and produces an Array in most of its methods.

As an example, let's compute the first three numbers in the range 1..10_000_000 that are even, multiplied by three. One way to do this is:

The above works, but creates many intermediate arrays: one for the #select call, one for the #map call and one for the #first call. A more efficient way is to invoke Range#each without a block, which gives us an Iterator so we can process the operations lazily:

Iterator redefines many of Enumerable's method in a lazy way, returning iterators instead of arrays.

At the end of the call chain we get back a new iterator: we need to consume it, either using #each or Enumerable#to_a:

Because iterators only go forward, when using methods that consume it entirely or partially – to_a, any?, count, none?, one? and size – subsequent calls will give a different result as there will be less elements to consume.

An iterator returns its next element on the method #next. Its return type is a union of the iterator's element type and the Stop type: T | Iterator::Stop. The stop type is a sentinel value which indicates that the iterator has reached its end. It usually needs to be handled and filtered out in order to use the element value for anything useful. Unlike Nil it's not an implicitly falsey type.

Iterator::Stop is only present in the return type of #next. All other methods remove it from their return types.

Iterators can be used to build a loop.

To implement an Iterator you need to define a #next method that must return the next element in the sequence or Iterator::Stop::INSTANCE, which signals the end of the sequence (you can invoke #stop inside an iterator as a shortcut).

For example, this is an iterator that returns a sequence of N zeros:

The standard library provides iterators for many classes, like Array, Hash, Range, String and IO. Usually to get an iterator you invoke a method that would usually yield elements to a block, but without passing a block: Array#each, Array#each_index, Hash#each, String#each_char, IO#each_line, etc.

Creates a new iterator which iterates over a JSON array.

The same as #chain, but have better performance when the quantity of iterators to chain is large (usually greater than 4) or undetermined.

the same as .chain(Iterator(Iter))

Returns an empty iterator.

Reads the content of a JSON array into an iterator in a lazy way.

Shortcut for Iterator::Stop::INSTANCE, to signal that there are no more elements in an iterator.

Returns an iterator that returns initial and its prefix sums with the original iterator's elements.

Returns an iterator that returns the prefix sums of the original iterator's elements.

Returns an iterator that accumulates initial with the original iterator's elements by the given block.

Returns an iterator that accumulates the original iterator's elements by the given block.

Returns an iterator that returns elements from the original iterator until it is exhausted and then returns the elements of the second iterator.

Returns an Iterator that enumerates over the items, chunking them together based on the return value of the block.

Returns an iterator for each chunked elements where elements are kept in a given chunk as long as the block's value over a pair of elements is truthy.

Returns an iterator that applies the given function to the element and then returns it unless it is nil.

Returns an iterator that returns consecutive chunks of the size n.

Returns an iterator that returns consecutive pairs of adjacent items.

Returns an iterator that repeatedly returns the elements of the original iterator starting back at the beginning when the end was reached, but only n times.

Returns an iterator that repeatedly returns the elements of the original iterator forever starting back at the beginning when the end was reached.

Calls the given block once for each element, passing that element as a parameter.

Returns an iterator that then returns slices of n elements of the initial iterator.

Returns an iterator that only returns the first n elements of the initial iterator.

Returns a new iterator with the concatenated results of running the block once for every element in the collection.

Returns an iterator that flattens nested iterators and arrays into a single iterator whose type is the union of the simple types of all of the nested iterators and arrays (and their nested iterators and arrays, and so on).

Returns an iterator that chunks the iterator's elements in arrays of size filling up the remaining elements if no element remains with nil or a given optional parameter.

Returns an iterator that applies the given block to the next element and returns the result.

Returns the next element in this iterator, or Iterator::Stop::INSTANCE if there are no more elements.

Returns an iterator that only returns elements for which the passed in block returns a falsey value.

Returns an iterator that only returns elements that are not of the given type.

Returns an iterator that only returns elements where pattern === element does not hold.

Returns an iterator that only returns elements for which the passed in block returns a truthy value.

Returns an iterator that only returns elements of the given type.

Returns an iterator that only returns elements where pattern === element.

Returns an iterator that skips the first n elements and only returns the elements after that.

Returns an iterator that only starts to return elements once the given block has returned falsey value for one element.

Alias of #each_slice.

Returns an iterator over chunks of elements, where each chunk ends right after the given block's value is truthy.

Returns an iterator over chunks of elements, where each chunk ends right after the given pattern is matched with pattern === element.

Returns an iterator over chunks of elements, where each chunk ends right before the given block's value is truthy.

Returns an iterator over chunks of elements, where each chunk ends right before the given pattern is matched with pattern === element.

Returns an iterator for each chunked elements where the ends of chunks are defined by the block, when the block's value over a pair of elements is truthy.

Returns an iterator that only returns every nth element, starting with the first.

Shortcut for Iterator::Stop::INSTANCE, to signal that there are no more elements in an iterator.

Returns an iterator that returns elements while the given block returns a truthy value.

Returns an iterator that calls the given block with the next element of the iterator when calling #next, still returning the original element.

Converts the content of an iterator into a JSON array in lazy way.

Converts the content of an iterator to YAML.

Returns an iterator that only returns unique values of the original iterator.

Returns an iterator that only returns unique values of the original iterator.

Returns an iterator that returns a Tuple of the element and its index.

Yields each element in this iterator together with its index.

Returns an iterator that returns a Tuple of the element and a given object.

Yields each element in this iterator together with obj.

Returns an iterator that returns the elements of this iterator and others traversed in tandem as Tuples.

Creates a new iterator which iterates over a JSON array. See also Iterator#from_json.

WARNING The JSON::PullParser can't be used by anything else until the iterator is fully consumed.

The same as #chain, but have better performance when the quantity of iterators to chain is large (usually greater than 4) or undetermined.

the same as .chain(Iterator(Iter))

Returns an empty iterator.

Reads the content of a JSON array into an iterator in a lazy way. With this method it should be possible to process a huge JSON array, without the requirement that the whole array fits into memory.

The following example produces a huge file, uses a lot of CPU but should not require much memory.

WARNING The string_or_io can't be used by anything else until the iterator is fully consumed.

Shortcut for Iterator::Stop::INSTANCE, to signal that there are no more elements in an iterator.

Returns an iterator that returns initial and its prefix sums with the original iterator's elements.

Expects U to respond to the #+ method.

Returns an iterator that returns the prefix sums of the original iterator's elements.

Expects T to respond to the #+ method.

Returns an iterator that accumulates initial with the original iterator's elements by the given block.

Similar to #accumulate(&block : T, T -> T), except the initial value is provided by an argument and needs not have the same type as the elements of the original iterator. This initial value is returned first.

Returns an iterator that accumulates the original iterator's elements by the given block.

For each element of the original iterator the block is passed an accumulator value and the element. The result becomes the new value for the accumulator and is then returned. The initial value for the accumulator is the first element of the original iterator.

Returns an iterator that returns elements from the original iterator until it is exhausted and then returns the elements of the second iterator. Compared to .chain(Iterator(Iter)), it has better performance when the quantity of iterators to chain is small (usually less than 4). This method also cannot chain iterators in a loop, for that see .chain(Iterator(Iter)).

Returns an Iterator that enumerates over the items, chunking them together based on the return value of the block.

Consecutive elements which return the same block value are chunked together.

For example, consecutive even numbers and odd numbers can be chunked as follows.

The following key values have special meaning:

By default, a new array is created and yielded for each chunk when invoking #next.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

See also: Enumerable#chunks.

Returns an iterator for each chunked elements where elements are kept in a given chunk as long as the block's value over a pair of elements is truthy.

For example, one-by-one increasing subsequences can be chunked as follows:

By default, a new array is created and yielded for each slice when invoking #next.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

See also #slice_when, which works similarly but the block's condition is inverted.

Returns an iterator that applies the given function to the element and then returns it unless it is nil. If the returned value would be nil it instead returns the next non nil value.

Returns an iterator that returns consecutive chunks of the size n.

By default, a new array is created and returned for each consecutive call of #next.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Chunks of two items can be iterated using #cons_pair, an optimized implementation for the special case of n == 2 which avoids heap allocations.

Returns an iterator that returns consecutive pairs of adjacent items.

Chunks of more than two items can be iterated using #cons. This method is just an optimized implementation for the special case of n == 2 to avoid heap allocations.

Returns an iterator that repeatedly returns the elements of the original iterator starting back at the beginning when the end was reached, but only n times.

Returns an iterator that repeatedly returns the elements of the original iterator forever starting back at the beginning when the end was reached.

Calls the given block once for each element, passing that element as a parameter.

Returns an iterator that then returns slices of n elements of the initial iterator.

By default, a new array is created and yielded for each consecutive when invoking #next.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns an iterator that only returns the first n elements of the initial iterator.

Returns a new iterator with the concatenated results of running the block once for every element in the collection. Only Array and Iterator results are concatenated; every other value is returned once in the new iterator.

Returns an iterator that flattens nested iterators and arrays into a single iterator whose type is the union of the simple types of all of the nested iterators and arrays (and their nested iterators and arrays, and so on).

Returns an iterator that chunks the iterator's elements in arrays of size filling up the remaining elements if no element remains with nil or a given optional parameter.

By default, a new array is created and yielded for each group.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns an iterator that applies the given block to the next element and returns the result.

Returns the next element in this iterator, or Iterator::Stop::INSTANCE if there are no more elements.

Returns an iterator that only returns elements for which the passed in block returns a falsey value.

Returns an iterator that only returns elements that are not of the given type.

Returns an iterator that only returns elements where pattern === element does not hold.

Returns an iterator that only returns elements for which the passed in block returns a truthy value.

Returns an iterator that only returns elements of the given type.

Returns an iterator that only returns elements where pattern === element.

Returns an iterator that skips the first n elements and only returns the elements after that.

Returns an iterator that only starts to return elements once the given block has returned falsey value for one element.

Alias of #each_slice.

Returns an iterator over chunks of elements, where each chunk ends right after the given block's value is truthy.

For example, to get chunks that end at each uppercase letter:

By default, a new array is created and yielded for each slice when invoking #next.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns an iterator over chunks of elements, where each chunk ends right after the given pattern is matched with pattern === element.

For example, to get chunks that end at each ASCII uppercase letter:

By default, a new array is created and yielded for each slice when invoking #next.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns an iterator over chunks of elements, where each chunk ends right before the given block's value is truthy.

For example, to get chunks that end just before each uppercase letter:

By default, a new array is created and yielded for each slice when invoking #next.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns an iterator over chunks of elements, where each chunk ends right before the given pattern is matched with pattern === element.

For example, to get chunks that end just before each ASCII uppercase letter:

By default, a new array is created and yielded for each slice when invoking #next.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

Returns an iterator for each chunked elements where the ends of chunks are defined by the block, when the block's value over a pair of elements is truthy.

For example, one-by-one increasing subsequences can be chunked as follows:

By default, a new array is created and yielded for each slice when invoking #next.

This can be used to prevent many memory allocations when each slice of interest is to be used in a read-only fashion.

See also #chunk_while, which works similarly but the block's condition is inverted.

Returns an iterator that only returns every nth element, starting with the first.

Shortcut for Iterator::Stop::INSTANCE, to signal that there are no more elements in an iterator.

Returns an iterator that returns elements while the given block returns a truthy value.

Returns an iterator that calls the given block with the next element of the iterator when calling #next, still returning the original element.

Converts the content of an iterator into a JSON array in lazy way. See Iterator#from_json for an example.

Converts the content of an iterator to YAML. The conversion is done in a lazy way. In contrast to Iterator#to_json this operation requires memory for the for the complete YAML document

Returns an iterator that only returns unique values of the original iterator.

Returns an iterator that only returns unique values of the original iterator. The provided block is applied to the elements to determine the value to be checked for uniqueness.

Returns an iterator that returns a Tuple of the element and its index.

Yields each element in this iterator together with its index.

Returns an iterator that returns a Tuple of the element and a given object.

Yields each element in this iterator together with obj. Returns that object.

Returns an iterator that returns the elements of this iterator and others traversed in tandem as Tuples.

Iteration stops when any of the iterators runs out of elements.

**Examples:**

Example 1 (csharp):
```csharp
(1..10_000_000).select(&.even?).map { |x| x * 3 }.first(3) # => [6, 12, 18]
```

Example 2 (csharp):
```csharp
(1..10_000_000).each.select(&.even?).map { |x| x * 3 }.first(3) # => #< Iterator(T)::First...
```

Example 3 (csharp):
```csharp
(1..10_000_000).each.select(&.even?).map { |x| x * 3 }.first(3).to_a # => [6, 12, 18]
```

Example 4 (javascript):
```javascript
iter = (0...100).each
iter.size # => 100
iter.size # => 0
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/Format/HTTP_DATE.html

**Contents:**
- module Time::Format::HTTP_DATE
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

Parse a time string using the formats specified by RFC 2616 and (non-RFC-compliant) IIS date format.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

Formats a Time into the given io.

time is always converted to UTC.

Formats a Time into a String.

time is always converted to UTC.

Parses a string into a Time.

**Examples:**

Example 1 (yaml):
```yaml
Time::Format::HTTP_DATE.parse("Sun, 14 Feb 2016 21:00:00 GMT")  # => 2016-02-14 21:00:00Z
Time::Format::HTTP_DATE.parse("Sunday, 14-Feb-16 21:00:00 GMT") # => 2016-02-14 21:00:00Z
Time::Format::HTTP_DATE.parse("Sun, 14-Feb-2016 21:00:00 GMT")  # => 2016-02-14 21:00:00Z
Time::Format::HTTP_DATE.parse("Sun Feb 14 21:00:00 2016")       # => 2016-02-14 21:00:00Z

Time::Format::HTTP_DATE.format(Time.utc(2016, 2, 15)) # => "Mon, 15 Feb 2016 00:00:00 GMT"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI/AArch64.html

**Contents:**
- class LLVM::ABI::AArch64
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class LLVM::ABI
  - Constructor methods inherited from class LLVM::ABI
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Based on https://github.com/rust-lang/rust/blob/master/src/librustc_trans/cabi_aarch64.rs

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/XML/Error.html

**Contents:**
- class XML::Error
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Exception
  - Constructor methods inherited from class Exception
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

DEPRECATED Legacy libxml2 API that mutate global state. Do not use.

DEPRECATED Legacy libxml2 API that mutate global state. Do not use.

DEPRECATED This class accessor is deprecated. XML errors are accessible directly in the respective context via XML::Reader#errors and XML::Node#errors.

DEPRECATED Legacy libxml2 API that mutate global state. Do not use.

DEPRECATED Legacy libxml2 API that mutate global state. Do not use.

DEPRECATED This class accessor is deprecated. XML errors are accessible directly in the respective context via XML::Reader#errors and XML::Node#errors.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OptionParser.html

**Contents:**
- class OptionParser
- Overview
- Subcommands
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

OptionParser is a class for command-line options processing. It supports:

Run crystal for an example of a CLI built with OptionParser.

NOTE To use OptionParser, you must explicitly import it with require "option_parser"

OptionParser also supports subcommands.

Creates a new parser.

Creates a new parser, with its configuration specified in the block.

Creates a new parser, with its configuration specified in the block, and uses it to parse the passed args (defaults to ARGV).

Establishes the initial message for the help printout.

Sets a handler which runs before each argument is parsed.

Returns whether the GNU convention is followed for optional arguments.

Returns whether the GNU convention is followed for optional arguments.

Sets a handler for option arguments that didn't match any of the setup options.

Sets a handler for when a option that expects an argument wasn't given any.

Establishes a handler for a pair of short and long flags.

Establishes a handler for a flag or subcommand.

Parses the passed args (defaults to ARGV), running the handlers associated to each option.

Adds a separator, with an optional header message, that will be used to print the help.

Stops the current parse and returns immediately, leaving the remaining flags unparsed.

Indentation for summary.

Indentation for summary.

Width for option list portion of summary.

Width for option list portion of summary.

Returns all the setup options, formatted in a help message.

Sets a handler for regular arguments that didn't match any of the setup options.

Creates a new parser.

Refer to #gnu_optional_args? for the behaviour of the named parameter.

Creates a new parser, with its configuration specified in the block.

Refer to #gnu_optional_args? for the behaviour of the named parameter.

Creates a new parser, with its configuration specified in the block, and uses it to parse the passed args (defaults to ARGV).

Refer to #gnu_optional_args? for the behaviour of the named parameter.

Establishes the initial message for the help printout. Typically, you want to write here the name of your program, and a one-line template of its invocation.

Sets a handler which runs before each argument is parsed. This callback is not passed flag arguments. For example, --foo=foo_arg --bar bar_arg would pass --foo=foo_arg and --bar to the callback only.

You typically use this to implement advanced option parsing behaviour such as treating all options after a filename differently (along with #stop).

Returns whether the GNU convention is followed for optional arguments.

If true, any optional argument must follow the preceding flag in the same token immediately, without any space inbetween:

Without gnu_optional_args: true, prints the following instead:

Returns whether the GNU convention is followed for optional arguments.

If true, any optional argument must follow the preceding flag in the same token immediately, without any space inbetween:

Without gnu_optional_args: true, prints the following instead:

Sets a handler for option arguments that didn't match any of the setup options.

You typically use this to display a help message. The default behaviour is to raise InvalidOption.

Sets a handler for when a option that expects an argument wasn't given any.

You typically use this to display a help message. The default behaviour is to raise MissingOption.

Establishes a handler for a pair of short and long flags.

See the other definition of #on for examples. This method does not support subcommands.

Establishes a handler for a flag or subcommand.

Flags must start with a dash or double dash. They can also have an optional argument, which will get passed to the block. Each flag has a description, which will be used for the help message.

Subcommands are any flag passed which does not start with a dash. They cannot take arguments. When a subcommand is parsed, all subcommands are removed from the OptionParser, simulating a "tree" of subcommands. All flags remain valid. For a longer example, see the examples at the top of the page.

Examples of valid flags:

Examples of valid subcommands:

Parses the passed args (defaults to ARGV), running the handlers associated to each option.

Adds a separator, with an optional header message, that will be used to print the help. The separator is placed between the flags registered (#on) before, and the flags registered after the call.

This way, you can group the different options in an easier to read way.

Stops the current parse and returns immediately, leaving the remaining flags unparsed. This is treated identically to -- being inserted behind the current parsed flag.

Indentation for summary.

Indentation for summary.

Width for option list portion of summary.

Width for option list portion of summary.

Returns all the setup options, formatted in a help message.

Sets a handler for regular arguments that didn't match any of the setup options.

You typically use this to get the main arguments (not modifiers) that your program expects (for example, filenames). The default behaviour is to do nothing. The arguments can also be extracted from the args array passed to #parse after parsing.

**Examples:**

Example 1 (julia):
```julia
require "option_parser"

upcase = false
destination = "World"

OptionParser.parse do |parser|
  parser.banner = "Usage: salute [arguments]"
  parser.on("-u", "--upcase", "Upcases the salute") { upcase = true }
  parser.on("-t NAME", "--to=NAME", "Specifies the name to salute") { |name| destination = name }
  parser.on("-h", "--help", "Show this help") do
    puts parser
    exit
  end
  parser.invalid_option do |flag|
    STDERR.puts "ERROR: #{flag} is not a valid option."
    STDERR.puts parser
    exit(1)
  end
end

destination = destination.upcase if upcase
puts "Hello #{destination}!"
```

Example 2 (julia):
```julia
require "option_parser"

verbose = false
salute = false
welcome = false
name = "World"
parser = OptionParser.new do |parser|
  parser.banner = "Usage: example [subcommand] [arguments]"
  parser.on("salute", "Salute a name") do
    salute = true
    parser.banner = "Usage: example salute [arguments]"
    parser.on("-t NAME", "--to=NAME", "Specify the name to salute") { |_name| name = _name }
  end
  parser.on("welcome", "Print a greeting message") do
    welcome = true
    parser.banner = "Usage: example welcome"
  end
  parser.on("-v", "--verbose", "Enabled verbose output") { verbose = true }
  parser.on("-h", "--help", "Show this help") do
    puts parser
    exit
  end
end

parser.parse

if salute
  STDERR.puts "Saluting #{name}" if verbose
  puts "Hello #{name}"
elsif welcome
  STDERR.puts "Welcoming #{name}" if verbose
  puts "Welcome!"
else
  puts parser
  exit(1)
end
```

Example 3 (unknown):
```unknown
require "option_parser"

parser = OptionParser.new
parser.banner = "Usage: crystal [command] [switches] [program file] [--] [arguments]"
```

Example 4 (julia):
```julia
require "option_parser"

OptionParser.parse(%w(-a1 -a 2 -a --b=3 --b 4), gnu_optional_args: true) do |parser|
  parser.on("-a", "--b [x]", "optional") { |x| p x }
  parser.unknown_args { |args, _| puts "Remaining: #{args}" }
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI/FunctionType.html

**Contents:**
- class LLVM::ABI::FunctionType
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/WebSocket.html

**Contents:**
- class HTTP::WebSocket
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

NOTE To use WebSocket, you must explicitly import it with require "http/web_socket"

Opens a new websocket using the information provided by the URI.

Opens a new websocket to the target host.

Sends a close frame, and closes the connection.

Called when a binary message is received.

Called when the connection is closed by the other party.

Called when a text message is received.

Called when a PING frame is received.

Called when a PONG frame is received.

Sends a PONG frame, which must be in response to a previously received PING frame from #on_ping.

Continuously receives messages and calls previously set callbacks until the websocket is closed.

Sends a message payload (message).

Streams data into io until the io is flushed and sent as a message.

Opens a new websocket using the information provided by the URI. This will also handle the handshake and will raise an exception if the handshake did not complete successfully. This method will also raise an exception if the URI is missing the host and/or the path.

Please note that the scheme will only be used to identify if TLS should be used or not. Therefore, schemes apart from wss and https will be treated as the default which is ws.

Opens a new websocket to the target host. This will also handle the handshake and will raise an exception if the handshake did not complete successfully.

Sends a close frame, and closes the connection. The close frame may contain a body (message) that indicates the reason for closing.

Called when a binary message is received.

Called when the connection is closed by the other party.

Called when a text message is received.

Called when a PING frame is received.

Called when a PONG frame is received.

An unsolicited PONG frame should not be responded to.

Sends a PING frame. Received pings will call #on_ping.

The receiving party must respond with a PONG.

Sends a PONG frame, which must be in response to a previously received PING frame from #on_ping.

Continuously receives messages and calls previously set callbacks until the websocket is closed. Ping and pong messages are automatically handled.

Sends a message payload (message).

Streams data into io until the io is flushed and sent as a message.

The method accepts a block with an io argument. The io object can call on IO#write and IO#flush method. The write method accepts Bytes (Slice(UInt8)) and sends the data in chunks of frame_size bytes. The flush method sends all the data in io and resets it. The remaining data in it is sent as a message when the block is finished executing. For further information, see the HTTP::WebSocket::Protocol::StreamIO class.

**Examples:**

Example 1 (yaml):
```yaml
require "http/web_socket"

HTTP::WebSocket.new(URI.parse("ws://websocket.example.com/chat"))        # Creates a new WebSocket to `websocket.example.com`
HTTP::WebSocket.new(URI.parse("wss://websocket.example.com/chat"))       # Creates a new WebSocket with TLS to `websocket.example.com`
HTTP::WebSocket.new(URI.parse("http://websocket.example.com:8080/chat")) # Creates a new WebSocket to `websocket.example.com` on port `8080`
HTTP::WebSocket.new(URI.parse("ws://websocket.example.com/chat"),        # Creates a new WebSocket to `websocket.example.com` with an Authorization header
  HTTP::Headers{"Authorization" => "Bearer authtoken"})
HTTP::WebSocket.new(
  URI.parse("ws://user:password@websocket.example.com/chat")) # Creates a new WebSocket to `websocket.example.com` with an HTTP basic auth Authorization header
```

Example 2 (yaml):
```yaml
require "http/web_socket"

HTTP::WebSocket.new("websocket.example.com", "/chat")            # Creates a new WebSocket to `websocket.example.com`
HTTP::WebSocket.new("websocket.example.com", "/chat", tls: true) # Creates a new WebSocket with TLS to `ẁebsocket.example.com`
```

Example 3 (julia):
```julia
# Open websocket connection
ws = HTTP::WebSocket.new("websocket.example.com", "/chat")

# Set callback
ws.on_message do |msg|
  ws.send "response"
end

# Start infinite loop
ws.run
```

Example 4 (julia):
```julia
# Open websocket connection
ws = HTTP::WebSocket.new("websocket.example.com", "/chat")

# Open stream
ws.stream(false) do |io|
  io.write "Hello, ".encode("UTF-8") # Sends "Hello, " to io
  io.flush                           # Sends "Hello, " to the socket
  io.write "world!".encode("UTF-8")  # Sends "world!" to io
end
# Sends "world!" to the socket
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Digest/SHA1.html

**Contents:**
- class Digest::SHA1
- Overview
- Extended Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class OpenSSL::Digest
  - Constructor methods inherited from class OpenSSL::Digest
  - Instance methods inherited from class Digest
  - Instance methods inherited from class Reference

Implements the SHA1 digest algorithm.

NOTE To use SHA1, you must explicitly import it with require "digest/sha1"

WARNING SHA1 is no longer a cryptographically secure hash, and should not be used in security-related components, like password hashing. For passwords, see Crypto::Bcrypt::Password. For a generic cryptographic hash, use SHA-256 via Digest::SHA256.

Returns a shallow copy of this object.

Returns a shallow copy of this object.

This allocates a new object and copies the contents of self into it.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Crystal/SyntaxHighlighter.html

**Contents:**
- abstract class Crystal::SyntaxHighlighter
- Direct Known Subclasses
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Parses code as Crystal source code and processes it.

Renders token with text value.

Renders a delimiter sequence.

Renders an interpolation sequence.

Renders a string array sequence.

Parses code as Crystal source code and processes it.

Renders token with text value.

Renders a delimiter sequence.

Renders an interpolation sequence.

Renders a string array sequence.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/CSV/MalformedCSVError.html

**Contents:**
- class CSV::MalformedCSVError
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Exception
  - Constructor methods inherited from class Exception
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Raised when an error is encountered during CSV parsing.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Regex/MatchOptions.html

**Contents:**
- enum Regex::MatchOptions
- Overview
- Defined in:
- Enum Members
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum
  - Instance methods inherited from module Comparable(Enum)

Represents options passed to regex match methods such as Regex#match.

Force pattern anchoring at the start of the subject.

Force pattern anchoring at the end of the subject.

Unsupported with PCRE.

Unsupported with PCRE.

Do not check subject for valid UTF encoding.

This option is potentially dangerous and must only be used when the subject is guaranteed to be valid (e.g. String#valid_encoding?). Failing to do so can lead to undefined behaviour in the regex library and may crash the entire process.

NOTE String is supposed to be valid UTF-8, but this is not guaranteed or enforced. Especially data originating from external sources should not be trusted.

UTF validation is comparatively expensive, so skipping it can produce a significant performance improvement.

A good use case is when the same subject is matched multiple times, UTF validation only needs to happen once.

This option has no effect if the pattern was compiled with CompileOptions::MATCH_INVALID_UTF when using PCRE2 10.34+.

Returns true if this enum value contains ANCHORED

Returns true if this enum value contains ENDANCHORED

Returns true if this enum value contains NO_JIT

Returns true if this enum value contains NO_UTF_CHECK

Returns true if this enum value contains ANCHORED

Returns true if this enum value contains ENDANCHORED

Returns true if this enum value contains NO_JIT

Returns true if this enum value contains NO_UTF_CHECK

**Examples:**

Example 1 (julia):
```julia
subject = "foo"
if subject.valid_encoding?
  /foo/.match(subject, options: Regex::MatchOptions::NO_UTF_CHECK)
else
  raise "Invalid UTF in regex subject"
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/Backend.html

**Contents:**
- abstract class Log::Backend
- Overview
- Direct Known Subclasses
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Base class for all backends.

Closes underlying resources used by this backend.

Writes the entry to this backend.

Closes underlying resources used by this backend.

Writes the entry to this backend.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Link.html

**Contents:**
- annotation Link
- Overview
- Defined in:

A lib can be marked with @[Link(lib : String, *, ldflags : String, static : Bool, framework : String, pkg_config : String, wasm_import_module : String, dll : String)] to declare the library that should be linked when compiling the program.

At least one of the lib, ldflags, framework arguments needs to be specified.

@[Link(ldflags: "-lpcre")] will pass -lpcre straight to the linker.

@[Link("pcre")] will lookup for a shared library.

@[Link("pcre", pkg_config: "libpcre")] will lookup for a shared library.

@[Link(framework: "Cocoa")] will pass -framework Cocoa to the linker.

@[Link(dll: "gc.dll")] will copy gc.dll to any built program. The DLL name must use .dll as its file extension and cannot contain any directory separators. The actual DLL is searched among CRYSTAL_LIBRARY_PATH, the compiler's own directory, and PATH in that order; a warning is printed if the DLL isn't found, although it might still run correctly if the DLLs are available in other DLL search paths on the system.

When an -l option is passed to the linker, it will lookup the libraries in paths passed with the -L option. Any paths in CRYSTAL_LIBRARY_PATH are added by default. Custom paths can be passed using ldflags: @[Link(ldflags: "-Lvendor/bin")].

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/FunctionPassManager.html

**Contents:**
- class LLVM::FunctionPassManager
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

DEPRECATED The legacy pass manager was removed in LLVM 17. Use LLVM::PassBuilderOptions instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Experimental.html

**Contents:**
- annotation Experimental
- Overview
- Defined in:

This annotation marks methods, classes, constants, and macros as experimental.

Experimental features are subject to change or be removed despite the https://semver.org/ guarantees.

**Examples:**

Example 1 (sql):
```sql
@[Experimental("Join discussion about this topic at ...")]
def foo
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Crypto/Bcrypt.html

**Contents:**
- class Crypto::Bcrypt
- Overview
- Defined in:
- Constant Summary
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Pure Crystal implementation of the Bcrypt algorithm by Niels Provos and David Mazières, as presented at USENIX in 1999.

The algorithm has a maximum password length limit of 71 characters (see this comment on stackoverflow).

Refer to Crypto::Bcrypt::Password for a higher level interface.

Bcrypt, like the PBKDF2 or scrypt ciphers, are designed to be slow, so generating rainbow tables or cracking passwords is nearly impossible. Yet, computers are always getting faster and faster, so the actual cost must be incremented every once in a while. Always use the maximum cost that is tolerable, performance wise, for your application. Be sure to test and select this based on your server, not your home computer.

This implementation of Bcrypt is currently 50% slower than pure C solutions, so keep this in mind when selecting your cost. It may be wise to test with Ruby's bcrypt gem which is a binding to OpenBSD's implementation.

Last but not least: beware of denial of services! Always protect your application using an external strategy (eg: rate limiting), otherwise endpoints that verifies bcrypt hashes will be an easy target.

NOTE To use Bcrypt, you must explicitly import it with require "crypto/bcrypt"

Creates a new Crypto::Bcrypt object from the given password with salt and cost.

Creates a new Crypto::Bcrypt object from the given password with salt in bytes and cost.

Hashes the password using bcrypt algorithm using salt obtained via Random::Secure.random_bytes(SALT_SIZE).

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Appends a short String representation of this object which includes its class name and its object address.

Returns a nicely readable and concise string representation of this object, typically intended for users.

Creates a new Crypto::Bcrypt object from the given password with salt and cost.

salt must be a base64 encoded string of 16 bytes (128 bits).

Creates a new Crypto::Bcrypt object from the given password with salt in bytes and cost.

Hashes the password using bcrypt algorithm using salt obtained via Random::Secure.random_bytes(SALT_SIZE).

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Appends a short String representation of this object which includes its class name and its object address.

Returns a nicely readable and concise string representation of this object, typically intended for users.

This method should usually not be overridden. It delegates to #to_s(IO) which can be overridden for custom implementations.

**Examples:**

Example 1 (swift):
```swift
require "crypto/bcrypt"

password = Crypto::Bcrypt.new "secret", "CJjskaIgXR32DJYjVyNPdA=="
password.to_s # => "$2a$11$CJjskaIgXR32DJYjVyNPd./ajV3Yj6GiP0IAI6rR.fMnjRgozqqqG"
```

Example 2 (julia):
```julia
require "crypto/bcrypt"

password = Crypto::Bcrypt.new "secret".to_slice, "salt_of_16_chars".to_slice
password.digest
```

Example 3 (yaml):
```yaml
require "crypto/bcrypt"

Crypto::Bcrypt.hash_secret "secret"
```

Example 4 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).inspect # => #<Person:0x10fd31f20 @name="John", @age=32>
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Spec/Context.html

**Contents:**
- abstract class Spec::Context
- Overview
- Direct Known Subclasses
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Base type for ExampleGroup.

All the children, which can be describe/context or it

All the children, which can be describe/context or it

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/DIBuilder.html

**Contents:**
- struct LLVM::DIBuilder
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

EXPERIMENTAL The C API wrapped by this type is marked as experimental by LLVM.

DEPRECATED Pass an array for subs directly

DEPRECATED Pass an LLVM::DwarfSourceLanguage for lang instead

DEPRECATED Pass an array for elements directly

DEPRECATED Pass an array for element_types directly

DEPRECATED Pass an array for parameter_types directly

DEPRECATED Pass an array for element_types directly

DEPRECATED Use a LibLLVM::MetadataRef for dl instead

DEPRECATED Pass an array for subs directly

DEPRECATED Pass an LLVM::DwarfSourceLanguage for lang instead

DEPRECATED Pass an array for elements directly

DEPRECATED Pass an array for element_types directly

DEPRECATED Pass an array for parameter_types directly

DEPRECATED Pass an array for element_types directly

DEPRECATED Use a LibLLVM::MetadataRef for dl instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OAuth.html

**Contents:**
- module OAuth
- Overview
  - Performing HTTP client requests with OAuth authentication
  - Obtaining access tokens
- Defined in:
- Class Method Summary
- Class Method Detail

The OAuth module provides an OAuth::Consumer as specified by RFC 5849.

NOTE To use OAuth, you must explicitly import it with require "oauth"

Assuming you have an access token, its secret, the consumer key and the consumer secret, you can setup an HTTP::Client to be authenticated with OAuth using this code:

This is implemented with HTTP::Client#before_request to add an authorization header to every request.

Alternatively, you can create an OAuth::Consumer and then invoke its OAuth::Consumer#authenticate method, or create an OAuth::AccessToken and invoke its OAuth::AccessToken#authenticate.

See OAuth::Consumer for an example.

Sets up an HTTP::Client to add an OAuth authorization header to every request performed.

Sets up an HTTP::Client to add an OAuth authorization header to every request performed. Check this module's docs for an example usage.

**Examples:**

Example 1 (julia):
```julia
require "http/client"
require "oauth"

token = "some_token"
secret = "some_secret"
consumer_key = "some_consumer_key"
consumer_secret = "some_consumer_secret"

# Create an HTTP::Client as usual
client = HTTP::Client.new("api.example.com", tls: true)

# Prepare it for using OAuth authentication
OAuth.authenticate(client, token, secret, consumer_key, consumer_secret)

# Execute requests as usual: they will be authenticated
client.get("/some_path")
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/CompressHandler.html

**Contents:**
- class HTTP::CompressHandler
- Overview
- Included Modules
- Defined in:
- Instance Method Summary
  - Instance methods inherited from module HTTP::Handler
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

A handler that configures an HTTP::Server::Response to compress the response output, either using gzip or deflate, depending on the Accept-Encoding request header.

NOTE To use CompressHandler, you must explicitly import it with require "http"

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/IO/FileDescriptor.html

**Contents:**
- class IO::FileDescriptor
- Overview
- Included Modules
- Direct Known Subclasses
- Defined in:
- Constructors
- Class Method Summary
- Macro Summary
- Instance Method Summary
  - Instance methods inherited from module IO::Buffered

An IO over a file descriptor.

Creates an IO::FileDescriptor from an existing system file descriptor or handle.

DEPRECATED parameter #blocking Use IO::FileDescriptor.set_blocking instead.

Returns whether the blocking mode of fd is blocking (true) or non blocking (false).

Changes the blocking mode of fd to be blocking (true) or non blocking (false).

Returns whether I/O operations on this file descriptor block the current thread.

DEPRECATED Use IO::FileDescriptor.get_blocking instead.

Changes the file descriptor's mode to blocking (true) or non blocking (false).

DEPRECATED Use IO::FileDescriptor.set_blocking instead.

Whether or not to close the file descriptor when this object is finalized.

Whether or not to close the file descriptor when this object is finalized.

Returns true if this IO is closed.

Yields self to the given block, enables character processing for the duration of the block, and returns the block's value.

Enables character processing on this IO.

Yields self to the given block, enables character echoing for the duration of the block, and returns the block's value.

Enables character echoing on this IO.

Returns the raw file-descriptor handle.

Finalizes the file descriptor resource.

Places an exclusive advisory lock.

Places a shared advisory lock.

Removes an existing advisory lock held by this process.

Flushes all data written to this File Descriptor to the disk device so that all changed information can be retrieved even if the system crashes or is rebooted.

Returns a File::Info object for this file descriptor, or raises IO::Error in case of an error.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Yields self to the given block, disables character echoing for the duration of the block, and returns the block's value.

Disables character echoing on this IO.

Sets the current position (in bytes) in this IO.

Yields self to the given block, enables raw mode for the duration of the block, and returns the block's value.

Enables raw mode on this IO.

The time to wait when reading before raising an IO::TimeoutError.

Sets the number of seconds to wait when reading before raising an IO::TimeoutError.

DEPRECATED Use #read_timeout=(Time::Span?) instead.

The time to wait when reading before raising an IO::TimeoutError.

Seeks to a given offset (in bytes) according to the whence argument.

Same as #seek but yields to the block after seeking and eventually seeks back to the original position when the block returns.

Returns true if this IO is associated with a terminal device (tty), false otherwise.

Sets the time to wait when writing before raising an IO::TimeoutError.

Sets the number of seconds to wait when writing before raising an IO::TimeoutError.

DEPRECATED Use #write_timeout=(Time::Span?) instead.

Sets the time to wait when writing before raising an IO::TimeoutError.

Creates an IO::FileDescriptor from an existing system file descriptor or handle.

This adopts fd into the IO system that will reconfigure it as per the event loop runtime requirements.

NOTE On Windows, the handle should have been created with FILE_FLAG_OVERLAPPED.

DEPRECATED parameter #blocking Use IO::FileDescriptor.set_blocking instead.

Returns whether the blocking mode of fd is blocking (true) or non blocking (false).

NOTE Only implemented on UNIX targets. Raises on Windows.

Changes the blocking mode of fd to be blocking (true) or non blocking (false).

NOTE Only implemented on UNIX targets. Raises on Windows.

Returns whether I/O operations on this file descriptor block the current thread. If false, operations might opt to suspend the current fiber instead.

This might be different from the internal file descriptor. For example, when STDIN is a terminal on Windows, this returns false since the underlying blocking reads are done on a completely separate thread.

DEPRECATED Use IO::FileDescriptor.get_blocking instead.

Changes the file descriptor's mode to blocking (true) or non blocking (false).

WARNING The file descriptor has been configured to behave correctly with the event loop runtime requirements. Changing the blocking mode can cause the event loop to misbehave, for example block the entire program when a fiber tries to read from this file descriptor.

DEPRECATED Use IO::FileDescriptor.set_blocking instead.

Whether or not to close the file descriptor when this object is finalized. Disabling this is useful in order to create an IO wrapper over a file descriptor returned from a C API that keeps ownership of the descriptor. Do note that, if the fd is closed by its owner at any point, any IO operations will then fail.

Whether or not to close the file descriptor when this object is finalized. Disabling this is useful in order to create an IO wrapper over a file descriptor returned from a C API that keeps ownership of the descriptor. Do note that, if the fd is closed by its owner at any point, any IO operations will then fail.

Returns true if this IO is closed.

IO defines returns false, but including types may override.

Yields self to the given block, enables character processing for the duration of the block, and returns the block's value.

The so called cooked mode is the standard behavior of a terminal, doing line wise editing by the terminal and only sending the input to the program on a newline.

Raises IO::Error if this IO is not a terminal device.

Enables character processing on this IO.

The so called cooked mode is the standard behavior of a terminal, doing line wise editing by the terminal and only sending the input to the program on a newline.

Raises IO::Error if this IO is not a terminal device.

Yields self to the given block, enables character echoing for the duration of the block, and returns the block's value.

This causes user input to be displayed as they are entered on the terminal.

Raises IO::Error if this IO is not a terminal device.

Enables character echoing on this IO.

This causes user input to be displayed as they are entered on the terminal.

Raises IO::Error if this IO is not a terminal device.

Returns the raw file-descriptor handle. Its type is platform-specific.

The file-descriptor handle has been configured for the IO system requirements. If it must be in a specific mode or have a specific set of flags set, then they must be applied, even when when it feels redundant, because even the same target isn't guaranteed to have the same requirements at runtime.

Finalizes the file descriptor resource.

This involves releasing the handle to the operating system, i.e. closing it. It does not implicitly call #flush, so data waiting in the buffer may be lost. It's recommended to always close the file descriptor explicitly via #close (or implicitly using the .open constructor).

Resource release can be disabled with close_on_finalize = false.

This method is a no-op if the file descriptor has already been closed.

Places an exclusive advisory lock. Only one process may hold an exclusive lock for a given file descriptor at a given time. IO::Error is raised if blocking is set to false and any existing lock is set.

Places a shared advisory lock. More than one process may hold a shared lock for a given file descriptor at a given time. IO::Error is raised if blocking is set to false and an existing exclusive lock is set.

Removes an existing advisory lock held by this process.

Flushes all data written to this File Descriptor to the disk device so that all changed information can be retrieved even if the system crashes or is rebooted. The call blocks until the device reports that the transfer has completed. To reduce disk activity the flush_metadata parameter can be set to false, then the syscall fdatasync will be used and only data required for subsequent data retrieval is flushed. Metadata such as modified time and access time is not written.

NOTE Metadata is flushed even when flush_metadata is false on Windows and DragonFly BSD.

Returns a File::Info object for this file descriptor, or raises IO::Error in case of an error.

Certain fields like the file size may not be updated until an explicit flush.

Use File.info if the file is not open and a path to the file is available.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Yields self to the given block, disables character echoing for the duration of the block, and returns the block's value.

This will prevent displaying back to the user what they enter on the terminal.

Raises IO::Error if this IO is not a terminal device.

Disables character echoing on this IO.

This will prevent displaying back to the user what they enter on the terminal.

Raises IO::Error if this IO is not a terminal device.

Sets the current position (in bytes) in this IO.

Yields self to the given block, enables raw mode for the duration of the block, and returns the block's value.

In raw mode every keypress is directly sent to the program, no interpretation is done by the terminal. On Windows, this also enables ANSI input escape sequences.

Raises IO::Error if this IO is not a terminal device.

Enables raw mode on this IO.

In raw mode every keypress is directly sent to the program, no interpretation is done by the terminal. On Windows, this also enables ANSI input escape sequences.

Raises IO::Error if this IO is not a terminal device.

The time to wait when reading before raising an IO::TimeoutError.

Sets the number of seconds to wait when reading before raising an IO::TimeoutError.

DEPRECATED Use #read_timeout=(Time::Span?) instead.

The time to wait when reading before raising an IO::TimeoutError.

Seeks to a given offset (in bytes) according to the whence argument. Returns self.

Same as #seek but yields to the block after seeking and eventually seeks back to the original position when the block returns.

Returns true if this IO is associated with a terminal device (tty), false otherwise.

IO returns false, but including types may override.

Sets the time to wait when writing before raising an IO::TimeoutError.

Sets the number of seconds to wait when writing before raising an IO::TimeoutError.

DEPRECATED Use #write_timeout=(Time::Span?) instead.

Sets the time to wait when writing before raising an IO::TimeoutError.

**Examples:**

Example 1 (javascript):
```javascript
File.write("testfile", "abc")

file = File.new("testfile", "a")
file.info.size # => 3
file << "defgh"
file.info.size # => 3
file.flush
file.info.size # => 8
```

Example 2 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).inspect # => #<Person:0x10fd31f20 @name="John", @age=32>
```

Example 3 (json):
```json
print "Enter password: "
password = STDIN.noecho &.gets.try &.chomp
puts
```

Example 4 (javascript):
```javascript
File.write("testfile", "hello")

file = File.new("testfile")
file.pos = 3
file.gets_to_end # => "lo"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/JSON.html

**Contents:**
- module JSON
- Overview
  - General type-safe interface
  - Parsing with JSON.parse
  - Generating with JSON.build
  - Generating with to_json
- Defined in:
- Class Method Summary
- Class Method Detail

The JSON module allows parsing and generating JSON documents.

NOTE To use JSON or its children, you must explicitly import it with require "json"

The general type-safe interface for parsing JSON is to invoke T.from_json on a target type T and pass either a String or IO as an argument.

Serializing is achieved by invoking to_json, which returns a String, or to_json(io : IO), which will stream the JSON to an IO.

Most types in the standard library implement these methods. For user-defined types you can define a self.new(pull : JSON::PullParser) for parsing and to_json(builder : JSON::Builder) for serializing. The following sections show convenient ways to do this using JSON::Serializable.

NOTE JSON object keys are always strings but they can still be parsed and deserialized to other types. To deserialize, define a T.from_json_object_key?(key : String) : T? method, which can return nil if the string can't be parsed into that type. To serialize, define a to_json_object_key : String method can be serialized that way. All integer and float types in the standard library can be deserialized that way.

JSON.parse will return an Any, which is a convenient wrapper around all possible JSON types, making it easy to traverse a complex JSON structure but requires some casts from time to time, mostly via some method invocations.

JSON.parse can read from an IO directly (such as a file) which saves allocating a string:

Parsing with JSON.parse is useful for dealing with a dynamic JSON structure.

Use JSON.build, which uses JSON::Builder, to generate JSON by emitting scalars, arrays and objects:

to_json, to_json(IO) and to_json(JSON::Builder) methods are provided for primitive types, but you need to define to_json(JSON::Builder) for custom objects, either manually or using JSON::Serializable.

Returns the resulting String of writing JSON to the yielded JSON::Builder.

Writes JSON into the given IO.

Parses a JSON document as a JSON::Any.

Returns the resulting String of writing JSON to the yielded JSON::Builder.

Accepts an indent parameter which can either be an Int (number of spaces to indent) or a String, which will prefix each level with the string a corresponding amount of times.

Writes JSON into the given IO. A JSON::Builder is yielded to the block.

Parses a JSON document as a JSON::Any.

**Examples:**

Example 1 (json):
```json
require "json"

json_text = %([1, 2, 3])
Array(Int32).from_json(json_text) # => [1, 2, 3]

json_text = %({"x": 1, "y": 2})
Hash(String, Int32).from_json(json_text) # => {"x" => 1, "y" => 2}
```

Example 2 (json):
```json
require "json"

[1, 2, 3].to_json            # => "[1,2,3]"
{"x" => 1, "y" => 2}.to_json # => "{\"x\":1,\"y\":2}"
```

Example 3 (json):
```json
require "json"

json_text = %({"1": 2, "3": 4})
Hash(Int32, Int32).from_json(json_text) # => {1 => 2, 3 => 4}

{1.5 => 2}.to_json # => "{\"1.5\":2}"
```

Example 4 (javascript):
```javascript
require "json"

value = JSON.parse("[1, 2, 3]") # : JSON::Any

value[0]               # => 1
typeof(value[0])       # => JSON::Any
value[0].as_i          # => 1
typeof(value[0].as_i)  # => Int32
value[0].as_i?         # => 1
typeof(value[0].as_i?) # => Int32 | Nil
value[0].as_s?         # => nil
typeof(value[0].as_s?) # => String | Nil

value[0] + 1       # Error, because value[0] is JSON::Any
value[0].as_i + 10 # => 11
```

---

## type¶

**URL:** https://crystal-lang.org/reference/1.18/syntax_and_semantics/c_bindings/type.html

**Contents:**
- type¶

A type declaration inside a lib declares a kind of C typedef, but stronger:

Unlike C, Int32 and MyInt are not interchangeable:

Thus, a type declaration is useful for opaque types that are created by the C library you are wrapping. An example of this is the C FILE type, which you can obtain with fopen.

Refer to the type grammar for the notation used in typedef types.

**Examples:**

Example 1 (typescript):
```typescript
lib X
  type MyInt = Int32
end
```

Example 2 (typescript):
```typescript
lib X
  type MyInt = Int32

  fun some_fun(value : MyInt)
end

X.some_fun 1 # Error: argument 'value' of 'X#some_fun' must be X::MyInt, not Int32
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI/X86_Win64.html

**Contents:**
- class LLVM::ABI::X86_Win64
- Overview
- Defined in:
  - Instance methods inherited from class LLVM::ABI::X86
  - Instance methods inherited from class LLVM::ABI
  - Constructor methods inherited from class LLVM::ABI
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Based on https://github.com/rust-lang/rust/blob/29ac04402d53d358a1f6200bea45a301ff05b2d1/src/librustc_trans/trans/cabi_x86_win64.rs

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

---

## Performance¶

**URL:** https://crystal-lang.org/reference/1.18/guides/performance.html

**Contents:**
- Performance¶
- Premature optimization¶
- Avoiding memory allocations¶
  - Don't create intermediate strings when writing to an IO¶
  - Use string interpolation instead of concatenation¶
  - Avoid IO allocation for string building¶
  - Avoid creating temporary objects over and over¶
  - Use structs when possible¶
- Iterating strings¶

Follow these tips to get the best out of your programs, both in speed and memory terms.

Donald Knuth once said:

We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%.

However, if you are writing a program and you realize that writing a semantically equivalent, faster version involves just minor changes, you shouldn't miss that opportunity.

And always be sure to profile your program to learn what its bottlenecks are. For profiling, on macOS you can use Instruments Time Profiler, which comes with XCode, or one of the sampling profilers. On Linux, any program that can profile C/C++ programs, like perf or Callgrind, should work. For both Linux and OS X, you can detect most hotspots by running your program within a debugger then hitting "ctrl+c" to interrupt it occasionally and issuing a gdb backtrace command to look for patterns in backtraces (or use the gdb poor man's profiler which does the same thing for you, or OS X sample command.

Make sure to always profile programs by compiling or running them with the --release flag, which turns on optimizations.

One of the best optimizations you can do in a program is avoiding extra/useless memory allocation. A memory allocation happens when you create an instance of a class, which ends up allocating heap memory. Creating an instance of a struct uses stack memory and doesn't incur a performance penalty. If you don't know the difference between stack and heap memory, be sure to read this.

Allocating heap memory is slow, and it puts more pressure on the Garbage Collector (GC) as it will later have to free that memory.

There are several ways to avoid heap memory allocations. The standard library is designed in a way to help you do that.

To print a number to the standard output you write:

In many programming languages what will happen is that to_s, or a similar method for converting the object to its string representation, will be invoked, and then that string will be written to the standard output. This works, but it has a flaw: it creates an intermediate string, in heap memory, only to write it and then discard it. This, involves a heap memory allocation and gives a bit of work to the GC.

In Crystal, puts will invoke to_s(io) on the object, passing it the IO to which the string representation should be written.

So, you should never do this:

as it will create an intermediate string. Always append an object directly to an IO.

When writing custom types, always be sure to override to_s(io), not to_s, and avoid creating intermediate strings in that method. For example:

This philosophy of appending to an IO instead of returning an intermediate string results in better performance than handling intermediate strings. You should use this strategy in your API definitions too.

Let's compare the times:

Always remember that it's not just the time that has improved: memory usage is also decreased.

Sometimes you need to work directly with strings built from combining string literals with other values. You shouldn't just concatenate these strings with String#+(String) but rather use string interpolation which allows to embed expressions into a string literal: "Hello, #{name}" is better than "Hello, " + name.to_s.

Interpolated strings are transformed by the compiler to append to a string IO so that it automatically avoids intermediate strings. The example above translates to:

Prefer to use the dedicated String.build optimized for building strings, instead of creating an intermediate IO::Memory allocation.

Consider this program:

The above program works but has a big performance problem: on every iteration a new array is created for ["crystal", "ruby", "java"]. Remember: an array literal is just syntax sugar for creating an instance of an array and adding some values to it, and this will happen over and over on each iteration.

There are two ways to solve this:

Use a tuple. If you use {"crystal", "ruby", "java"} in the above program it will work the same way, but since a tuple doesn't involve heap memory it will be faster, consume less memory, and give more chances for the compiler to optimize the program.

Move the array to a constant.

Using tuples is the preferred way.

Explicit array literals in loops is one way to create temporary objects, but these can also be created via method calls. For example Hash#keys will return a new array with the keys each time it's invoked. Instead of doing that, you can use Hash#each_key, Hash#has_key? and other methods.

If you declare your type as a struct instead of a class, creating an instance of it will use stack memory, which is much cheaper than heap memory and doesn't put pressure on the GC.

You shouldn't always use a struct, though. Structs are passed by value, so if you pass one to a method and the method makes changes to it, the caller won't see those changes, so they can be bug-prone. The best thing to do is to only use structs with immutable objects, especially if they are small.

Strings in Crystal always contain UTF-8 encoded bytes. UTF-8 is a variable-length encoding: a character may be represented by several bytes, although characters in the ASCII range are always represented by a single byte. Because of this, indexing a string with String#[] is not an O(1) operation, as the bytes need to be decoded each time to find the character at the given position. There's an optimization that Crystal's String does here: if it knows all the characters in the string are ASCII, then String#[] can be implemented in O(1). However, this isn't generally true.

For this reason, iterating a String in this way is not optimal, and in fact has a complexity of O(n^2):

There's a second problem with the above: computing the size of a String is also slow, because it's not simply the number of bytes in the string (the bytesize). However, once a String's size has been computed, it is cached.

The way to improve performance in this case is to either use one of the iteration methods (each_char, each_byte, each_codepoint), or use the more low-level Char::Reader struct. For example, using each_char:

**Examples:**

Example 1 (unknown):
```unknown
puts 123.to_s
```

Example 2 (julia):
```julia
class MyClass
  # Good
  def to_s(io)
    # appends "1, 2" to IO without creating intermediate strings
    x = 1
    y = 2
    io << x << ", " << y
  end

  # Bad
  def to_s(io)
    x = 1
    y = 2
    # using a string interpolation creates an intermediate string.
    # this should be avoided
    io << "#{x}, #{y}"
  end
end
```

Example 3 (julia):
```julia
require "benchmark"

io = IO::Memory.new

Benchmark.ips do |x|
  x.report("without to_s") do
    io << 123
    io.clear
  end

  x.report("with to_s") do
    io << 123.to_s
    io.clear
  end
end
```

Example 4 (unknown):
```unknown
$ crystal run --release io_benchmark.cr
without to_s  77.11M ( 12.97ns) (± 1.05%)       fastest
   with to_s  18.15M ( 55.09ns) (± 7.99%)  4.25× slower
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Signal.html

**Contents:**
- enum Signal
- Overview
- Portability
- Defined in:
- Enum Members
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum

Safely handle inter-process signals on POSIX systems.

Signals are dispatched to the event loop and later processed in a dedicated fiber. Some received signals may never be processed when the program terminates.

WARNING An uncaught exception in a signal handler is a fatal error.

The set of available signals is platform-dependent. Only signals that exist on the target platform are available as members of this enum.

The methods #trap, #reset, and #ignore may not be implemented at all on non-POSIX systems.

The standard library provides several platform-agnostic APIs to achieve tasks that are typically solved with signals on POSIX systems:

Returns true if this enum value equals ABRT

Returns true if this enum value equals ALRM

Returns true if this enum value equals BUS

Returns true if this enum value equals CHLD

Returns true if this enum value equals CONT

Returns true if this enum value equals FPE

Returns true if this enum value equals HUP

Clears the handler for this signal and prevents the OS default action.

Returns true if this enum value equals ILL

Returns true if this enum value equals INT

Returns true if this enum value equals IO

Returns true if this enum value equals IOT

Returns true if this enum value equals KILL

Returns true if this enum value equals PIPE

Returns true if this enum value equals PWR

Returns true if this enum value equals QUIT

Resets the handler for this signal to the OS default.

Returns true if this enum value equals SEGV

Returns true if this enum value equals STKFLT

Returns true if this enum value equals STOP

Returns true if this enum value equals SYS

Returns true if this enum value equals TERM

Sets the handler for this signal to the passed function.

Returns true if this enum value equals TRAP

Returns any existing handler for this signal

Returns true if this enum value equals TSTP

Returns true if this enum value equals TTIN

Returns true if this enum value equals TTOU

Returns true if this enum value equals UNUSED

Returns true if this enum value equals URG

Returns true if this enum value equals USR1

Returns true if this enum value equals USR2

Returns true if this enum value equals VTALRM

Returns true if this enum value equals WINCH

Returns true if this enum value equals XCPU

Returns true if this enum value equals XFSZ

Returns true if this enum value equals ABRT

Returns true if this enum value equals ALRM

Returns true if this enum value equals BUS

Returns true if this enum value equals CHLD

Returns true if this enum value equals CONT

Returns true if this enum value equals FPE

Returns true if this enum value equals HUP

Clears the handler for this signal and prevents the OS default action.

Note that trying to ignore CHLD will actually set the default crystal handler that monitors and reaps child processes. This prevents zombie processes and is required by Process#wait for example.

Returns true if this enum value equals ILL

Returns true if this enum value equals INT

Returns true if this enum value equals IO

Returns true if this enum value equals IOT

Returns true if this enum value equals KILL

Returns true if this enum value equals PIPE

Returns true if this enum value equals PWR

Returns true if this enum value equals QUIT

Resets the handler for this signal to the OS default.

Note that trying to reset CHLD will actually set the default crystal handler that monitors and reaps child processes. This prevents zombie processes and is required by Process#wait for example.

Returns true if this enum value equals SEGV

Returns true if this enum value equals STKFLT

Returns true if this enum value equals STOP

Returns true if this enum value equals SYS

Returns true if this enum value equals TERM

Sets the handler for this signal to the passed function.

After executing this, whenever the current process receives the corresponding signal, the passed function will be called (instead of the OS default). The handler will run in a signal-safe fiber throughout the event loop; there is no limit to what functions can be called, unlike raw signals that run on the sigaltstack.

Note that CHLD is always trapped and child processes will always be reaped before the custom handler is called, hence a custom CHLD handler must check child processes using Process.exists?. Trying to use waitpid with a zero or negative value won't work.

NOTE Process.on_terminate is preferred over Signal::INT.trap as a portable alternative which also works on Windows.

Returns true if this enum value equals TRAP

Returns any existing handler for this signal

Returns true if this enum value equals TSTP

Returns true if this enum value equals TTIN

Returns true if this enum value equals TTOU

Returns true if this enum value equals UNUSED

Returns true if this enum value equals URG

Returns true if this enum value equals USR1

Returns true if this enum value equals USR2

Returns true if this enum value equals VTALRM

Returns true if this enum value equals WINCH

Returns true if this enum value equals XCPU

Returns true if this enum value equals XFSZ

**Examples:**

Example 1 (yaml):
```yaml
puts "Ctrl+C still has the OS default action (stops the program)"
sleep 3.seconds

Signal::INT.trap do
  puts "Gotcha!"
end
puts "Ctrl+C will be caught from now on"
sleep 3.seconds

Signal::INT.reset
puts "Ctrl+C is back to the OS default action"
sleep 3.seconds
```

Example 2 (yaml):
```yaml
Signal::USR1.trap { }
prev_handler = Signal::USR1.trap_handler?

Signal::USR1.trap do |signal|
  prev_handler.try &.call(signal)
  # ...
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Digest/SHA512.html

**Contents:**
- class Digest::SHA512
- Overview
- Extended Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class OpenSSL::Digest
  - Constructor methods inherited from class OpenSSL::Digest
  - Instance methods inherited from class Digest
  - Instance methods inherited from class Reference

Implements the SHA512 digest algorithm.

NOTE To use SHA512, you must explicitly import it with require "digest/sha512"

Returns a shallow copy of this object.

Returns a shallow copy of this object.

This allocates a new object and copies the contents of self into it.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/Format.html

**Contents:**
- struct Time::Format
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Specifies the format to convert a Time to and from a String.

The pattern of a format is a String with directives. Directives being with a percent (%) character. Any text not listed as a directive will be passed/parsed through the output/input string.

ASCII whitespaces in the pattern string are written verbatim when formatting, and consume any number of ASCII whitespace characters on parsing.

Creates a new Time::Format with the given pattern.

Formats a Time into the given io.

Turns a Time into a String.

Parses a string into a Time.

Returns the string pattern of this format.

Creates a new Time::Format with the given pattern. The given time location will be used when parsing a Time and no time zone is found in it.

Formats a Time into the given io.

Turns a Time into a String.

Parses a string into a Time.

Returns the string pattern of this format.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Crystal.html

**Contents:**
- module Crystal
- Defined in:
- Constant Summary
- Class Method Summary
- Class Method Detail

The build commit identifier of the Crystal compiler.

The build date of the Crystal compiler.

The cache directory configured for the Crystal compiler.

The value is defined by the environment variable CRYSTAL_CACHE_DIR and defaults to the user's configured cache directory.

The default Crystal path configured in the compiler. This value is baked into the compiler and usually points to the accompanying version of the standard library.

Full version information of the Crystal compiler. Equivalent to crystal --version.

The LLVM target triple of the host system (the machine that the compiler runs on).

Colon-separated paths where the compiler searches for (binary) libraries.

The value is defined by the environment variables CRYSTAL_LIBRARY_PATH.

The version of LLVM used by the Crystal compiler.

Colon-separated paths where the compiler searches for required source files.

The value is defined by the environment variable CRYSTAL_PATH and defaults to DEFAULT_PATH.

The LLVM target triple of the target system (the machine that the compiler builds for).

The version of the Crystal compiler.

Defines the main routine run by normal Crystal programs:

Main method run by all Crystal programs at startup.

Executes the main user code.

Prepares an error message, with an optional exception or backtrace, to an in-memory buffer, before writing to an IO, usually STDERR, in a single write operation.

Identical to #print_buffered but eventually calls System.print_error(bytes) to write to stderr without going through the event loop.

Defines the main routine run by normal Crystal programs:

This method can be invoked if you need to define a custom main (as in C main) function, doing all the above steps.

Note that the above is really just an example, almost the same can be accomplished with at_exit. But in some cases redefinition of C's main is needed.

Main method run by all Crystal programs at startup.

This setups up the GC, invokes your program, rescuing any handled exception, and then runs at_exit handlers.

This method is automatically invoked for you, so you don't need to invoke it.

However, if you need to define a special main C function, you can redefine main and invoke Crystal.main from it:

The Crystal.main can also be passed as a callback:

Note that before Crystal.main is invoked the GC is not setup yet, so nothing that allocates memory in Crystal (like new for classes) can be used.

Executes the main user code. This normally is executed after initializing the GC and before executing at_exit handlers.

You should never invoke this method unless you need to redefine C's main function. See Crystal.main for more details.

Prepares an error message, with an optional exception or backtrace, to an in-memory buffer, before writing to an IO, usually STDERR, in a single write operation.

Avoids intermingled messages caused by multiple threads writing to a STDIO in parallel. This may still happen, since writes may not be atomic when the overall size is larger than PIPE_BUF, buf it should at least write 512 bytes atomically.

Identical to #print_buffered but eventually calls System.print_error(bytes) to write to stderr without going through the event loop.

**Examples:**

Example 1 (julia):
```julia
fun main(argc : Int32, argv : UInt8**) : Int32
  Crystal.main do
    elapsed = Time.measure do
      Crystal.main_user_code(argc, argv)
    end
    puts "Time to execute program: #{elapsed}"
  end
end
```

Example 2 (julia):
```julia
fun main(argc : Int32, argv : UInt8**) : Int32
  # some setup before Crystal main
  Crystal.main(argc, argv)
  # some cleanup logic after Crystal main
end
```

Example 3 (php):
```php
fun main(argc : Int32, argv : UInt8**) : Int32
  LibFoo.init_foo_and_invoke_main(argc, argv, ->Crystal.main(Int32, UInt8**))
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/Server/RequestProcessor.html

**Contents:**
- class HTTP::Server::RequestProcessor
- Defined in:
- Constant Summary
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Maximum permitted combined size of the headers in an HTTP request.

Maximum permitted combined size of the headers in an HTTP request.

Maximum permitted size of the request line in an HTTP request.

Maximum permitted size of the request line in an HTTP request.

Maximum permitted combined size of the headers in an HTTP request.

Maximum permitted combined size of the headers in an HTTP request.

Maximum permitted size of the request line in an HTTP request.

Maximum permitted size of the request line in an HTTP request.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/Builder.html

**Contents:**
- class LLVM::Builder
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

DEPRECATED Pass the function type of func as well (equal to func.function_type) in order to support LLVM 15+

DEPRECATED Pass the function type of func as well (equal to func.function_type) in order to support LLVM 15+

DEPRECATED Pass the function type of func as well (equal to func.function_type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the function type of fn as well (equal to fn.function_type) in order to support LLVM 15+

DEPRECATED Pass the pointee of ptr as well (equal to ptr.type.element_type) in order to support LLVM 15+

DEPRECATED Call #set_current_debug_location(metadata, context) or #clear_current_debug_location instead

DEPRECATED Pass the function type of func as well (equal to func.function_type) in order to support LLVM 15+

DEPRECATED Pass the function type of func as well (equal to func.function_type) in order to support LLVM 15+

DEPRECATED Pass the function type of func as well (equal to func.function_type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the type of value as well (equal to value.type) in order to support LLVM 15+

DEPRECATED Pass the function type of fn as well (equal to fn.function_type) in order to support LLVM 15+

DEPRECATED Pass the pointee of ptr as well (equal to ptr.type.element_type) in order to support LLVM 15+

DEPRECATED Call #set_current_debug_location(metadata, context) or #clear_current_debug_location instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/YAML/Nodes/Scalar.html

**Contents:**
- class YAML::Nodes::Scalar
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class YAML::Nodes::Node
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Creates a scalar with the given value.

Returns the kind of this node, which is equivalent to the class name.

The style of this scalar.

The style of this scalar.

The value of this scalar.

The value of this scalar.

Creates a scalar with the given value.

Returns the kind of this node, which is equivalent to the class name.

The style of this scalar.

The style of this scalar.

The value of this scalar.

The value of this scalar.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/TCPServer.html

**Contents:**
- class TCPServer
- Overview
- Included Modules
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Socket::Server
  - Instance methods inherited from class TCPSocket
  - Constructor methods inherited from class TCPSocket

A Transmission Control Protocol (TCP/IP) server.

NOTE To use TCPServer, you must explicitly import it with require "socket"

Binds a socket to the host and port combination.

Creates a new TCPServer, waiting to be bound.

Creates a new TCP server, listening on all local interfaces (::).

Creates a TCPServer from an existing system file descriptor or socket handle.

Creates a new TCP server, listening on all interfaces, and yields it to the block.

Creates a new TCP server and yields it to the block.

Accepts an incoming connection.

Binds a socket to the host and port combination.

Creates a new TCPServer, waiting to be bound.

Creates a new TCP server, listening on all local interfaces (::).

Creates a TCPServer from an existing system file descriptor or socket handle.

This adopts fd into the IO system that will reconfigure it as per the event loop runtime requirements.

NOTE On Windows, the handle must have been created with WSA_FLAG_OVERLAPPED.

Creates a new TCP server, listening on all interfaces, and yields it to the block. Eventually closes the server socket when the block returns.

Returns the value of the block.

Creates a new TCP server and yields it to the block. Eventually closes the server socket when the block returns.

Returns the value of the block.

Accepts an incoming connection.

Returns the client TCPSocket or nil if the server is closed after invoking this method.

**Examples:**

Example 1 (python):
```python
require "socket"

def handle_client(client)
  message = client.gets
  client.puts message
end

server = TCPServer.new("localhost", 1234)
while client = server.accept?
  spawn handle_client(client)
end
```

Example 2 (julia):
```julia
require "socket"

server = TCPServer.new(2022)
loop do
  if socket = server.accept?
    # handle the client in a fiber
    spawn handle_connection(socket)
  else
    # another fiber closed the server
    break
  end
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/WebSocketHandler.html

**Contents:**
- class HTTP::WebSocketHandler
- Overview
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module HTTP::Handler
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

A handler which adds websocket functionality to an HTTP::Server.

NOTE To use WebSocketHandler, you must explicitly import it with require "http"

When a request can be upgraded, the associated HTTP::WebSocket and HTTP::Server::Context will be yielded to the block. For example:

**Examples:**

Example 1 (julia):
```julia
ws_handler = HTTP::WebSocketHandler.new do |ws, ctx|
  ws.on_ping { ws.pong ctx.request.path }
end
server = HTTP::Server.new [ws_handler]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/SystemError.html

**Contents:**
- module SystemError
- Overview
- Customization
- Direct including types
- Defined in:
- Instance Method Summary
- Instance Method Detail

This module can be included in any Exception subclass that is used to wrap some system error (Errno or WinError).

It adds an #os_error property that contains the original system error. It provides several constructor methods that set the #os_error value:

An error message is automatically constructed based on the system error message.

Including classes my override several protected methods to customize the instance creation based on OS errors:

The original system error wrapped by this exception

The original system error wrapped by this exception

**Examples:**

Example 1 (php):
```php
class MyError < Exception
  include SystemError
end

MyError.from_errno("Something happened")
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Digest/MD5.html

**Contents:**
- class Digest::MD5
- Overview
- Extended Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class OpenSSL::Digest
  - Constructor methods inherited from class OpenSSL::Digest
  - Instance methods inherited from class Digest
  - Instance methods inherited from class Reference

Implements the MD5 digest algorithm.

NOTE To use MD5, you must explicitly import it with require "digest/md5"

WARNING MD5 is no longer a cryptographically secure hash, and should not be used in security-related components, like password hashing. For passwords, see Crypto::Bcrypt::Password. For a generic cryptographic hash, use SHA-256 via Digest::SHA256.

Returns a shallow copy of this object.

Returns a shallow copy of this object.

This allocates a new object and copies the contents of self into it.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/Format/RFC_3339.html

**Contents:**
- module Time::Format::RFC_3339
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

The RFC 3339 datetime format (ISO 8601 profile).

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

**Examples:**

Example 1 (yaml):
```yaml
Time::Format::RFC_3339.format(Time.utc(2016, 2, 15, 4, 35, 50)) # => "2016-02-15T04:35:50Z"

Time::Format::RFC_3339.parse("2016-02-15T04:35:50Z") # => 2016-02-15 04:35:50Z
Time::Format::RFC_3339.parse("2016-02-15 04:35:50Z") # => 2016-02-15 04:35:50Z
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Random/Secure.html

**Contents:**
- module Random::Secure
- Overview
- Extended Modules
- Defined in:
- Instance Method Summary
- Instance Method Detail

Random::Secure generates random numbers from a secure source provided by the system.

It uses a cryptographically secure pseudorandom number generator (CSPRNG) for cryptography and secure usages such as generating secret keys, or to seed another pseudorandom number generator (PRNG).

On BSD-based systems and macOS/Darwin, it uses arc4random, on Linux getrandom, on Windows RtlGenRandom, and falls back to reading from /dev/urandom on UNIX systems.

**Examples:**

Example 1 (json):
```json
Random::Secure.rand(6)            # => 4
[1, 5, 6].shuffle(Random::Secure) # => [6, 1, 5]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/MIME/Multipart/Builder.html

**Contents:**
- class MIME::Multipart::Builder
- Overview
  - Example
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Builds a multipart MIME message.

Creates a new Multipart::Builder which writes the generated multipart message to io, using the multipart boundary boundary.

Appends a body part to the multipart message with the given headers and string.

Appends a body part to the multipart message with the given headers and data.

Appends a body part to the multipart message with the given headers and data from body_io.

Yields an IO that can be used to write to a body part which is appended to the multipart message with the given headers.

Appends a body part to the multipart message with the given headers and no body data.

Returns a content type header with multipart subtype subtype, and boundary parameter added.

Appends string to the epilogue segment of the multipart message.

Appends data to the epilogue segment of the multipart message.

Appends preamble_io to the epilogue segment of the multipart message.

Yields an IO that can be used to append to the epilogue of the multipart message.

Finalizes the multipart message, this method must be called to properly end the multipart message.

Appends string to the preamble segment of the multipart message.

Appends data to the preamble segment of the multipart message.

Appends preamble_io to the preamble segment of the multipart message.

Yields an IO that can be used to append to the preamble of the multipart message.

Creates a new Multipart::Builder which writes the generated multipart message to io, using the multipart boundary boundary.

Appends a body part to the multipart message with the given headers and string. Throws if #finish or #epilogue is called before this method.

Appends a body part to the multipart message with the given headers and data. Throws if #finish or #epilogue is called before this method.

Appends a body part to the multipart message with the given headers and data from body_io. Throws if #finish or #epilogue is called before this method.

Yields an IO that can be used to write to a body part which is appended to the multipart message with the given headers. Throws if #finish or #epilogue is called before this method.

Appends a body part to the multipart message with the given headers and no body data. Throws is #finish or #epilogue is called before this method.

Returns a content type header with multipart subtype subtype, and boundary parameter added.

Appends string to the epilogue segment of the multipart message. Throws if #finish is called before this method, or no body parts have been appended.

Can be called multiple times to append to the epilogue multiple times.

Appends data to the epilogue segment of the multipart message. Throws if #finish is called before this method, or no body parts have been appended.

Can be called multiple times to append to the epilogue multiple times.

Appends preamble_io to the epilogue segment of the multipart message. Throws if #finish is called before this method, or no body parts have been appended.

Can be called multiple times to append to the epilogue multiple times.

Yields an IO that can be used to append to the epilogue of the multipart message. Throws if #finish is called before this method, or no body parts have been appended.

Can be called multiple times to append to the preamble multiple times.

Finalizes the multipart message, this method must be called to properly end the multipart message.

Appends string to the preamble segment of the multipart message. Throws if #body_part is called before this method.

Can be called multiple times to append to the preamble multiple times.

Appends data to the preamble segment of the multipart message. Throws if #body_part is called before this method.

Can be called multiple times to append to the preamble multiple times.

Appends preamble_io to the preamble segment of the multipart message. Throws if #body_part is called before this method.

Can be called multiple times to append to the preamble multiple times.

Yields an IO that can be used to append to the preamble of the multipart message. Throws if #body_part is called before this method.

Can be called multiple times to append to the preamble multiple times.

**Examples:**

Example 1 (swift):
```swift
require "mime/multipart"

io = IO::Memory.new # This is a stub. Actually, any IO can be used.
multipart = MIME::Multipart::Builder.new(io)
multipart.body_part HTTP::Headers{"Content-Type" => "text/plain"}, "hello!"
multipart.finish
io.to_s # => "----------------------------DTf61dRTHYzprx7rwVQhTWr7\r\nContent-Type: text/plain\r\n\r\nhello!\r\n----------------------------DTf61dRTHYzprx7rwVQhTWr7--"
```

Example 2 (swift):
```swift
require "mime/multipart"

io = IO::Memory.new # This is a stub. Actually, any IO can be used.
builder = MIME::Multipart::Builder.new(io, "a4VF")
builder.content_type("mixed") # => "multipart/mixed; boundary=a4VF"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Digest/Adler32.html

**Contents:**
- class Digest::Adler32
- Overview
- Extended Modules
- Defined in:
- Constructors
- Class Method Summary
  - Instance methods inherited from class Digest
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Implements the Adler32 checksum algorithm.

NOTE To use Adler32, you must explicitly import it with require "digest/adler32"

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/Emitter.html

**Contents:**
- struct Log::Emitter
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Helper DSL module for emitting log entries with data.

Emits a logs entry with a message, and data attached to

Emits a logs entry with a message, and data attached to

**Examples:**

Example 1 (css):
```css
Log.info &.emit("Program started")                         # No data, same as Log.info { "Program started" }
Log.info &.emit("User logged in", user_id: 42)             # With entry data
Log.info &.emit(action: "Logged in", user_id: 42)          # Empty string message, only data
Log.error exception: ex, &.emit("Oops", account: {id: 42}) # With data and exception
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/YAML/Schema/FailSafe.html

**Contents:**
- module YAML::Schema::FailSafe
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

Provides a way to parse a YAML document according to the fail-safe schema, as specified in http://www.yaml.org/spec/1.2/spec.html#id2802346, where all scalar values are considered strings.

Deserializes a YAML document.

Deserializes multiple YAML documents.

Deserializes a YAML document.

Deserializes multiple YAML documents.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Levenshtein.html

**Contents:**
- module Levenshtein
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

Levenshtein distance methods.

NOTE To use Levenshtein, you must explicitly import it with require "levenshtein"

Computes the levenshtein distance of two strings.

Finds the best match for name among strings added within the given block.

Finds the best match for name among strings provided in all_names.

Computes the levenshtein distance of two strings.

Finds the best match for name among strings added within the given block. tolerance can be used to set maximum Levenshtein distance allowed.

Finds the best match for name among strings provided in all_names. tolerance can be used to set maximum Levenshtein distance allowed.

**Examples:**

Example 1 (javascript):
```javascript
require "levenshtein"

Levenshtein.distance("algorithm", "altruistic") # => 6
Levenshtein.distance("hello", "hallo")          # => 1
Levenshtein.distance("こんにちは", "こんちは")           # => 1
Levenshtein.distance("hey", "hey")              # => 0
```

Example 2 (javascript):
```javascript
require "levenshtein"

best_match = Levenshtein.find("hello") do |l|
  l.test "hulk"
  l.test "holk"
  l.test "halka"
  l.test "ello"
end
best_match # => "ello"
```

Example 3 (javascript):
```javascript
require "levenshtein"

Levenshtein.find("hello", ["hullo", "hel", "hall", "hell"], 2) # => "hullo"
Levenshtein.find("hello", ["hurlo", "hel", "hall"], 1)         # => nil
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/Formatter.html

**Contents:**
- module Log::Formatter
- Overview
- Defined in:
- Constructors
- Instance Method Summary
- Constructor Detail
- Instance Method Detail

Base interface to convert log entries and write them to an IO

Creates an instance of a Log::Formatter that calls the specified Proc for every entry

Writes a Log::Entry through an IO

Creates an instance of a Log::Formatter that calls the specified Proc for every entry

Writes a Log::Entry through an IO

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Benchmark/IPS.html

**Contents:**
- module Benchmark::IPS
- Overview
- Defined in:

Benchmark IPS calculates the number of iterations per second for a given block of code. The strategy is to use two stages: a warmup stage and a calculation stage.

The warmup phase defaults to 2 seconds. During this stage we figure out how many cycles are needed to run the block for roughly 100ms, and record it.

The calculation defaults to 5 seconds. During this stage we run the block in sets of the size calculated in the warmup stage. The measurements for those sets are then used to calculate the mean and standard deviation, which are then reported. Additionally we compare the means to that of the fastest.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Enum/ValueConverter.html

**Contents:**
- module Enum::ValueConverter(T)
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Constructor Detail
- Class Method Detail

Converter for value-based serialization and deserialization of enum type T.

The serialization format of Enum#to_json and Enum.from_json is based on the member name. This converter offers an alternative based on the member value.

This converter can be used for its standalone serialization methods as a replacement of the default strategy of Enum. It also works as a serialization converter with JSON::Field and YAML::Field

NOTE Automatically assigned enum values are subject to change when the order of members by adding, removing or reordering them. This can affect the integrity of serialized data between two instances of a program based on different code versions. A way to avoid this is to explicitly assign fixed values to enum members.

Reads a serialized enum member by value from pull.

Reads a serialized enum member by value from ctx and node.

Serializes enum member member by value.

Serializes enum member member by value.

Reads a serialized enum member by value from pull.

See .to_json for reference.

Raises JSON::ParseException if the deserialization fails.

Reads a serialized enum member by value from ctx and node.

See .to_yaml for reference.

Raises YAML::ParseException if the deserialization fails.

Serializes enum member member by value.

For both flags enums and non-flags enums, the value of the enum member is used for serialization.

Enum#to_json offers a different serialization strategy based on the member name.

Serializes enum member member by value.

For both flags enums and non-flags enums, the value of the enum member is used for serialization.

Enum#to_yaml offers a different serialization strategy based on the member name.

**Examples:**

Example 1 (python):
```python
require "json"
require "yaml"

enum MyEnum
  ONE = 1
  TWO = 2
end

class Foo
  include JSON::Serializable
  include YAML::Serializable

  @[JSON::Field(converter: Enum::ValueConverter(MyEnum))]
  @[YAML::Field(converter: Enum::ValueConverter(MyEnum))]
  property foo : MyEnum = MyEnum::ONE

  def initialize(@foo)
  end
end

foo = Foo.new(MyEnum::ONE)
foo.to_json # => %({"foo":1})
foo.to_yaml # => %(---\nfoo: 1\n)
```

Example 2 (yaml):
```yaml
enum Stages
  INITIAL
  SECOND_STAGE
end

Enum::ValueConverter.to_json(Stages::INITIAL)      # => %(0)
Enum::ValueConverter.to_json(Stages::SECOND_STAGE) # => %(1)

@[Flags]
enum Sides
  LEFT
  RIGHT
end

Enum::ValueConverter.to_json(Sides::LEFT)                # => %(1)
Enum::ValueConverter.to_json(Sides::LEFT | Sides::RIGHT) # => %(3)
Enum::ValueConverter.to_json(Sides::All)                 # => %(3)
Enum::ValueConverter.to_json(Sides::None)                # => %(0)
```

Example 3 (yaml):
```yaml
enum Stages
  INITIAL
  SECOND_STAGE
end

Enum::ValueConverter.to_yaml(Stages::INITIAL)      # => %(--- 0\n)
Enum::ValueConverter.to_yaml(Stages::SECOND_STAGE) # => %(--- 1\n)

@[Flags]
enum Sides
  LEFT
  RIGHT
end

Enum::ValueConverter.to_yaml(Sides::LEFT)                # => %(--- 1\n)
Enum::ValueConverter.to_yaml(Sides::LEFT | Sides::RIGHT) # => %(--- 3\n)
Enum::ValueConverter.to_yaml(Sides::All)                 # => %(--- 3\n)
Enum::ValueConverter.to_yaml(Sides::None)                # => %(--- 0\n)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI/ARM.html

**Contents:**
- class LLVM::ABI::ARM
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class LLVM::ABI
  - Constructor methods inherited from class LLVM::ABI
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Based on https://github.com/rust-lang/rust/blob/dfe8bd10fe6763e0a1d5d55fa2574ecba27d3e2e/src/librustc_trans/cabi_arm.rs

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Socket/UNIXAddress.html

**Contents:**
- struct Socket::UNIXAddress
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Socket::Address
  - Constructor methods inherited from struct Socket::Address
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value

UNIX address representation.

Holds the local path of an UNIX address, usually coming from an opened connection (e.g. Socket#local_address, Socket#receive).

Creates an UNIXSocket from the internal OS representation.

Creates an UNIXSocket from the internal OS representation.

Parses a Socket::UNIXAddress from an URI.

Parses a Socket::UNIXAddress from an URI.

See Object#hash(hasher)

Same as #inspect(io).

Creates an UNIXSocket from the internal OS representation.

Creates an UNIXSocket from the internal OS representation.

Parses a Socket::UNIXAddress from an URI.

It expects the URI to include <scheme>://<path> where scheme as well as any additional URI components (such as fragment or query) are ignored.

If host is not empty, it will be prepended to #path to form a relative path.

Parses a Socket::UNIXAddress from an URI.

It expects the URI to include <scheme>://<path> where scheme as well as any additional URI components (such as fragment or query) are ignored.

If host is not empty, it will be prepended to #path to form a relative path.

See Object#hash(hasher)

Same as #inspect(io).

**Examples:**

Example 1 (yaml):
```yaml
require "socket"

Socket::UNIXAddress.new("/tmp/my.sock")
```

Example 2 (yaml):
```yaml
require "socket"

Socket::UNIXAddress.parse("unix:///foo.sock") # => Socket::UNIXAddress.new("/foo.sock")
Socket::UNIXAddress.parse("unix://foo.sock")  # => Socket::UNIXAddress.new("foo.sock")
```

Example 3 (yaml):
```yaml
require "socket"

Socket::UNIXAddress.parse("unix:///foo.sock") # => Socket::UNIXAddress.new("/foo.sock")
Socket::UNIXAddress.parse("unix://foo.sock")  # => Socket::UNIXAddress.new("foo.sock")
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Process/ExitReason.html

**Contents:**
- enum Process::ExitReason
- Overview
- Defined in:
- Enum Members
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum
  - Instance methods inherited from module Comparable(Enum)

The reason why a process terminated.

This enum provides a platform-independent way to query any exceptions that occurred upon a process's termination, via Process::Status#exit_reason.

The process exited normally.

The process terminated due to an abort request.

The process exited due to an interrupt request.

The process reached a debugger breakpoint, but no debugger was attached.

The process tried to access a memory address where a read or write was not allowed.

The process tried to access an invalid memory address.

The process tried to execute an invalid instruction.

A hardware floating-point exception occurred.

The process exited due to a POSIX signal.

Only applies to signals without a more specific exit reason. Unused on Windows.

The process exited in a way that cannot be represented by any other ExitReasons.

A Process::Status that maps to Unknown may map to a different value if new enum members are added to ExitReason.

The process exited due to the user closing the terminal window or ending an ssh session.

The process exited due to the user logging off or shutting down the OS.

Returns true if the process exited abnormally.

Returns true if this enum value equals Aborted

Returns true if this enum value equals AccessViolation

Returns true if this enum value equals BadInstruction

Returns true if this enum value equals BadMemoryAccess

Returns true if this enum value equals Breakpoint

Returns a textual description of this exit reason.

Returns true if this enum value equals FloatException

Returns true if this enum value equals Interrupted

Returns true if this enum value equals Normal

Returns true if this enum value equals SessionEnded

Returns true if this enum value equals Signal

Returns true if this enum value equals TerminalDisconnected

Returns true if this enum value equals Unknown

Returns true if the process exited abnormally.

This includes all values except Normal.

Returns true if this enum value equals Aborted

Returns true if this enum value equals AccessViolation

Returns true if this enum value equals BadInstruction

Returns true if this enum value equals BadMemoryAccess

Returns true if this enum value equals Breakpoint

Returns a textual description of this exit reason.

Status#description provides more detail for a specific process status.

Returns true if this enum value equals FloatException

Returns true if this enum value equals Interrupted

Returns true if this enum value equals Normal

Returns true if this enum value equals SessionEnded

Returns true if this enum value equals Signal

Returns true if this enum value equals TerminalDisconnected

Returns true if this enum value equals Unknown

**Examples:**

Example 1 (yaml):
```yaml
Process::ExitReason::Normal.description  # => "Process exited normally"
Process::ExitReason::Aborted.description # => "Process terminated abnormally"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/DirectDispatcher.html

**Contents:**
- module Log::DirectDispatcher
- Overview
- Extended Modules
- Defined in:
- Class Method Summary
- Class Method Detail

Stateless dispatcher that deliver log entries immediately

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/YAML/Nodes/Mapping.html

**Contents:**
- class YAML::Nodes::Mapping
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class YAML::Nodes::Node
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Appends a single node into this mapping.

Appends two nodes into this mapping.

Yields each key-value pair in this mapping.

Returns the kind of this node, which is equivalent to the class name.

The nodes inside this mapping, stored linearly as key1 - value1 - key2 - value2 - etc.

Appends a single node into this mapping.

Appends two nodes into this mapping.

Yields each key-value pair in this mapping.

Returns the kind of this node, which is equivalent to the class name.

The nodes inside this mapping, stored linearly as key1 - value1 - key2 - value2 - etc.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Crystal/SyntaxHighlighter/HTML.html

**Contents:**
- class Crystal::SyntaxHighlighter::HTML
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Crystal::SyntaxHighlighter
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

A syntax highlighter that renders Crystal source code with HTML markup.

NOTE To use Crystal::SyntaxHighlighter::HTML, you must explicitly import it with require "crystal/syntax_highlighter/html"

Creates a new instance of an HTML syntax highlighter.

Highlights code and writes the result to io.

Highlights code and returns the result.

Highlights code or returns unhighlighted code on error.

Renders token with text value.

Renders a delimiter sequence.

Renders an interpolation sequence.

Renders a string array sequence.

Creates a new instance of an HTML syntax highlighter.

Appends highlighted output (when calling #highlight) to io.

Highlights code and writes the result to io.

Highlights code and returns the result.

Highlights code or returns unhighlighted code on error.

Same as .highlight(code : String) except that any error is rescued and returns unhighlighted source code.

Renders token with text value.

Renders a delimiter sequence.

Renders an interpolation sequence.

Renders a string array sequence.

**Examples:**

Example 1 (jsx):
```jsx
require "crystal/syntax_highlighter/html"

code = %(foo = bar("baz\#{PI + 1}") # comment)
html = Crystal::SyntaxHighlighter::HTML.highlight(code)
html # => "foo <span class=\"o\">=</span> bar(<span class=\"s\">&quot;baz</span><span class=\"i\">\#{</span><span class=\"t\">PI</span> <span class=\"o\">+</span> <span class=\"n\">1</span><span class=\"i\">}</span><span class=\"s\">&quot;</span>) <span class=\"c\"># comment</span>"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/CSV/Token.html

**Contents:**
- struct CSV::Token
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

A token in a CSV. It consists of a Kind and a value. The value only makes sense when the kind is Cell.

The string value. Only makes sense for a Cell.

The string value. Only makes sense for a Cell.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OpenSSL/MD5.html

**Contents:**
- class OpenSSL::MD5
- Overview
- Defined in:
- Class Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Binds the OpenSSL MD5 hash functions.

WARNING MD5 is no longer a cryptographically secure hash, and should not be used in security-related components, like password hashing. For passwords, see Crypto::Bcrypt::Password. For a generic cryptographic hash, use SHA-256 via OpenSSL::Digest.new("SHA256").

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OAuth2/Client.html

**Contents:**
- class OAuth2::Client
- Overview
  - Example
- Defined in:
- Constant Summary
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

For a quick example of how to authenticate an HTTP::Client with OAuth2 if you already have an access token, check the OAuth2 module description.

This class also provides methods to build authorize URIs and get access tokens with different methods, as specified by RFC 6749.

You can also use an OAuth2::Session to automatically refresh expired tokens before each request.

Creates an OAuth client.

Gets an access token using an authorization code, as specified by RFC 6749, Section 4.1.3.

Gets an access token using client credentials, as specified by RFC 6749, Section 4.4.2.

Gets an access token using a refresh token, as specified by RFC 6749, Section 6.

Gets an access token using the resource owner credentials, as specified by RFC 6749, Section 4.3.2.

Builds an authorize URI, as specified by RFC 6749, Section 4.1.1.

Builds an authorize URI, as specified by RFC 6749, Section 4.1.1.

Returns the HTTP::Client to use with this client.

Sets the HTTP::Client to use with this client.

Makes a token exchange request with custom headers and form fields

Gets the redirect_uri

Creates an OAuth client.

Any or all of the customizable URIs authorize_uri and token_uri can be relative or absolute. If they are relative, the given host, port and scheme will be used. If they are absolute, the absolute URL will be used.

As per https://tools.ietf.org/html/rfc6749#section-2.3.1, AuthScheme::HTTPBasic is the default auth_scheme (the mechanism used to transmit the client credentials to the server). AuthScheme::RequestBody should only be used if the server does not support HTTP Basic.

Gets an access token using an authorization code, as specified by RFC 6749, Section 4.1.3.

Gets an access token using client credentials, as specified by RFC 6749, Section 4.4.2.

Gets an access token using a refresh token, as specified by RFC 6749, Section 6.

Gets an access token using the resource owner credentials, as specified by RFC 6749, Section 4.3.2.

Builds an authorize URI, as specified by RFC 6749, Section 4.1.1.

Builds an authorize URI, as specified by RFC 6749, Section 4.1.1.

Yields an URI::Params::Builder to add extra parameters other than those defined by the standard.

Returns the HTTP::Client to use with this client.

By default, this returns a new instance every time. To reuse the same instance, one can be assigned with #http_client=.

Sets the HTTP::Client to use with this client.

Makes a token exchange request with custom headers and form fields

Gets the redirect_uri

**Examples:**

Example 1 (markdown):
```markdown
require "oauth2"

client_id = "some_client_id"
client_secret = "some_client_secret"
redirect_uri = "http://some.callback"

# Create oauth client, optionally pass custom URIs if needed,
# if the authorize or token URIs are not the standard ones
# (they can also be absolute URLs)
oauth2_client = OAuth2::Client.new("api.example.com", client_id, client_secret,
  redirect_uri: redirect_uri)

# Build an authorize URI
authorize_uri = oauth2_client.get_authorize_uri

# Redirect the user to `authorize_uri`...
#
# ...
#
# When http://some.callback is hit, once the user authorized the access,
# we resume our logic to finally get an access token. The callback URL
# should receive an `authorization_code` parameter that we need to use.
authorization_code = request.params["code"]

# Get the access token
access_token = oauth2_client.get_access_token_using_authorization_code(authorization_code)

# Probably save the access token for reuse... This can be done
# with `to_json` and `from_json`.

# Use the token to authenticate an HTTP::Client
client = HTTP::Client.new("api.example.com", tls: true)
access_token.authenticate(client)

# And do requests as usual
client.get "/some_path"

# If the token expires, we can refresh it
new_access_token = oauth2_client.get_access_token_using_refresh_token(access_token.refresh_token)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI/Wasm32.html

**Contents:**
- class LLVM::ABI::Wasm32
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class LLVM::ABI
  - Constructor methods inherited from class LLVM::ABI
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Spec/ExampleGroup/Procsy.html

**Contents:**
- struct Spec::ExampleGroup::Procsy
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Wraps an ExampleGroup and a Proc that will eventually execute the group.

The group that will eventually run when calling #run.

Executes the wrapped example group, possibly executing other around_all hooks before that.

The group that will eventually run when calling #run.

Executes the wrapped example group, possibly executing other around_all hooks before that.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/XML/ParserOptions.html

**Contents:**
- enum XML::ParserOptions
- Defined in:
- Enum Members
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum
  - Instance methods inherited from module Comparable(Enum)

Load the external subset

Default DTD attributes

Validate with the DTD

Suppress error reports

Suppress warning reports

Pedantic error reporting

Use the SAX1 interface internally

Implement XInclude substitution

Forbid network access

Do not reuse the context dictionary

Remove redundant namespaces declarations

Merge CDATA as text nodes

Do not generate XINCLUDE START/END nodes

Compact small text nodes; no modification of the tree allowed afterwards (will possibly crash if you try to modify the tree)

Parse using XML-1.0 before update 5

Do not fixup XINCLUDE xml:base uris

Relax any hardcoded limit from the parser

Parse using SAX2 interface before 2.7.0

Ignore internal document encoding hint

Store big lines numbers in text PSVI field

Returns default options for parsing XML documents.

Returns true if this enum value contains BIG_LINES

Returns true if this enum value contains COMPACT

Returns true if this enum value contains DTDATTR

Returns true if this enum value contains DTDLOAD

Returns true if this enum value contains DTDVALID

Returns true if this enum value contains HUGE

Returns true if this enum value contains IGNORE_ENC

Returns true if this enum value contains NOBASEFIX

Returns true if this enum value contains NOBLANKS

Returns true if this enum value contains NOCDATA

Returns true if this enum value contains NODICT

Returns true if this enum value contains NOENT

Returns true if this enum value contains NOERROR

Returns true if this enum value contains NONET

Returns true if this enum value contains NOWARNING

Returns true if this enum value contains NOXINCNODE

Returns true if this enum value contains NSCLEAN

Returns true if this enum value contains OLD10

Returns true if this enum value contains OLDSAX

Returns true if this enum value contains PEDANTIC

Returns true if this enum value contains RECOVER

Returns true if this enum value contains SAX1

Returns true if this enum value contains XINCLUDE

Returns default options for parsing XML documents.

Default flags are: RECOVER | NOWARNING | NONET

Returns true if this enum value contains BIG_LINES

Returns true if this enum value contains COMPACT

Returns true if this enum value contains DTDATTR

Returns true if this enum value contains DTDLOAD

Returns true if this enum value contains DTDVALID

Returns true if this enum value contains HUGE

Returns true if this enum value contains IGNORE_ENC

Returns true if this enum value contains NOBASEFIX

Returns true if this enum value contains NOBLANKS

Returns true if this enum value contains NOCDATA

Returns true if this enum value contains NODICT

Returns true if this enum value contains NOENT

Returns true if this enum value contains NOERROR

Returns true if this enum value contains NONET

Returns true if this enum value contains NOWARNING

Returns true if this enum value contains NOXINCNODE

Returns true if this enum value contains NSCLEAN

Returns true if this enum value contains OLD10

Returns true if this enum value contains OLDSAX

Returns true if this enum value contains PEDANTIC

Returns true if this enum value contains RECOVER

Returns true if this enum value contains SAX1

Returns true if this enum value contains XINCLUDE

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/StringScanner.html

**Contents:**
- class StringScanner
- Overview
  - Example
  - Method Categories
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

StringScanner provides for lexical scanning operations on a String.

NOTE To use StringScanner, you must explicitly import it with require "string_scanner"

Scanning a string means remembering the position of a scan offset, which is just an index. Scanning moves the offset forward, and matches are sought after the offset; usually immediately after it.

Methods that advance the scan offset:

Methods that look ahead:

Methods that deal with the position of the offset:

Methods that deal with the last match:

Miscellaneous methods:

Returns the n-th subgroup in the most recent match.

Returns the nilable n-th subgroup in the most recent match.

Returns the value that #scan would return, without advancing the scan offset.

Returns the value that #scan would return, without advancing the scan offset.

Returns the value that #scan would return, without advancing the scan offset.

Returns the value that #scan_until would return, without advancing the scan offset.

Returns the value that #scan_until would return, without advancing the scan offset.

Returns the value that #scan_until would return, without advancing the scan offset.

Returns true if the scan offset is at the end of the string.

Writes a representation of the scanner.

Returns the current position of the scan offset.

Sets the position of the scan offset.

Extracts a string corresponding to string[offset,len], without advancing the scan offset.

Resets the scan offset to the beginning and clears the last match.

Returns the remainder of the string after the scan offset.

Tries to match with pattern at the current position.

Tries to match with pattern at the current position.

Tries to match with pattern at the current position.

Scans the string until the pattern is matched.

Scans the string until the pattern is matched.

Scans the string until the pattern is matched.

Attempts to skip over the given pattern beginning with the scan offset.

Attempts to skip over the given pattern beginning with the scan offset.

Attempts to skip over the given pattern beginning with the scan offset.

Attempts to skip until the given pattern is found after the scan offset.

Attempts to skip until the given pattern is found after the scan offset.

Attempts to skip until the given pattern is found after the scan offset.

Returns the string being scanned.

Moves the scan offset to the end of the string and clears the last match.

Returns the n-th subgroup in the most recent match.

Raises an exception if there was no last match or if there is no subgroup.

Returns the nilable n-th subgroup in the most recent match.

Returns nil if there was no last match or if there is no subgroup.

Returns the value that #scan would return, without advancing the scan offset. The last match is still saved, however.

Returns the value that #scan would return, without advancing the scan offset. The last match is still saved, however.

Returns the value that #scan would return, without advancing the scan offset. The last match is still saved, however.

Returns the value that #scan_until would return, without advancing the scan offset. The last match is still saved, however.

Returns the value that #scan_until would return, without advancing the scan offset. The last match is still saved, however.

Returns the value that #scan_until would return, without advancing the scan offset. The last match is still saved, however.

Returns true if the scan offset is at the end of the string.

Writes a representation of the scanner.

Includes the current position of the offset, the total size of the string, and five characters near the current position.

Returns the current position of the scan offset.

Sets the position of the scan offset.

Extracts a string corresponding to string[offset,len], without advancing the scan offset.

Resets the scan offset to the beginning and clears the last match.

Returns the remainder of the string after the scan offset.

Tries to match with pattern at the current position. If there's a match, the scanner advances the scan offset, the last match is saved, and it returns the matched string. Otherwise, the scanner returns nil.

Tries to match with pattern at the current position. If there's a match, the scanner advances the scan offset, the last match is saved, and it returns the matched string. Otherwise, the scanner returns nil.

Tries to match with pattern at the current position. If there's a match, the scanner advances the scan offset, the last match is saved, and it returns the matched string. Otherwise, the scanner returns nil.

Scans the string until the pattern is matched. Returns the substring up to and including the end of the match, the last match is saved, and advances the scan offset. Returns nil if no match.

Scans the string until the pattern is matched. Returns the substring up to and including the end of the match, the last match is saved, and advances the scan offset. Returns nil if no match.

Scans the string until the pattern is matched. Returns the substring up to and including the end of the match, the last match is saved, and advances the scan offset. Returns nil if no match.

Attempts to skip over the given pattern beginning with the scan offset. In other words, the pattern is not anchored to the current scan offset.

If there's a match, the scanner advances the scan offset, the last match is saved, and it returns the size of the skipped match. Otherwise it returns nil and does not advance the offset.

This method is the same as #scan, but without returning the matched string.

Attempts to skip over the given pattern beginning with the scan offset. In other words, the pattern is not anchored to the current scan offset.

If there's a match, the scanner advances the scan offset, the last match is saved, and it returns the size of the skipped match. Otherwise it returns nil and does not advance the offset.

This method is the same as #scan, but without returning the matched string.

Attempts to skip over the given pattern beginning with the scan offset. In other words, the pattern is not anchored to the current scan offset.

If there's a match, the scanner advances the scan offset, the last match is saved, and it returns the size of the skipped match. Otherwise it returns nil and does not advance the offset.

This method is the same as #scan, but without returning the matched string.

Attempts to skip until the given pattern is found after the scan offset. In other words, the pattern is not anchored to the current scan offset.

If there's a match, the scanner advances the scan offset, the last match is saved, and it returns the size of the skip. Otherwise it returns nil and does not advance the offset.

This method is the same as #scan_until, but without returning the matched string.

Attempts to skip until the given pattern is found after the scan offset. In other words, the pattern is not anchored to the current scan offset.

If there's a match, the scanner advances the scan offset, the last match is saved, and it returns the size of the skip. Otherwise it returns nil and does not advance the offset.

This method is the same as #scan_until, but without returning the matched string.

Attempts to skip until the given pattern is found after the scan offset. In other words, the pattern is not anchored to the current scan offset.

If there's a match, the scanner advances the scan offset, the last match is saved, and it returns the size of the skip. Otherwise it returns nil and does not advance the offset.

This method is the same as #scan_until, but without returning the matched string.

Returns the string being scanned.

Moves the scan offset to the end of the string and clears the last match.

**Examples:**

Example 1 (javascript):
```javascript
require "string_scanner"

s = StringScanner.new("This is an example string")
s.eos? # => false

s.scan(/\w+/) # => "This"
s.scan(/\w+/) # => nil
s.scan(/\s+/) # => " "
s.scan(/\s+/) # => nil
s.scan(/\w+/) # => "is"
s.eos?        # => false

s.scan(/\s+/) # => " "
s.scan(/\w+/) # => "an"
s.scan(/\s+/) # => " "
s.scan(/\w+/) # => "example"
s.scan(/\s+/) # => " "
s.scan(/\w+/) # => "string"
s.eos?        # => true

s.scan(/\s+/) # => nil
s.scan(/\w+/) # => nil
```

Example 2 (typescript):
```typescript
require "string_scanner"

s = StringScanner.new("Fri Dec 12 1975 14:39")
regex = /(?<wday>\w+) (?<month>\w+) (?<day>\d+)/
s.scan(regex) # => "Fri Dec 12"
s[0]          # => "Fri Dec 12"
s[1]          # => "Fri"
s[2]          # => "Dec"
s[3]          # => "12"
s["wday"]     # => "Fri"
s["month"]    # => "Dec"
s["day"]      # => "12"
```

Example 3 (typescript):
```typescript
require "string_scanner"

s = StringScanner.new("Fri Dec 12 1975 14:39")
regex = /(?<wday>\w+) (?<month>\w+) (?<day>\d+)/
s.scan(regex)  # => "Fri Dec 12"
s[0]?          # => "Fri Dec 12"
s[1]?          # => "Fri"
s[2]?          # => "Dec"
s[3]?          # => "12"
s[4]?          # => nil
s["wday"]?     # => "Fri"
s["month"]?    # => "Dec"
s["day"]?      # => "12"
s["year"]?     # => nil
s.scan(/more/) # => nil
s[0]?          # => nil
```

Example 4 (javascript):
```javascript
require "string_scanner"

s = StringScanner.new("this is a string")
s.offset = 5
s.check(/\w+/) # => "is"
s.check(/\w+/) # => "is"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Hash.html

**Contents:**
- class Hash(K, V)
- Overview
- Included Modules
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Iterable({K, V})
  - Instance methods inherited from module Enumerable({K, V})
  - Class methods inherited from module Enumerable({K, V})

A Hash represents a collection of key-value mappings, similar to a dictionary.

Main operations are storing a key-value mapping (#[]=) and querying the value associated to a key (#[]). Key-value mappings can also be deleted (#delete). Keys are unique within a hash. When adding a key-value mapping with a key that is already in use, the old value will be forgotten.

Hash literals can also be used to create a Hash:

Implementation is based on an open hash table. Two objects refer to the same hash key when their hash value (Object#hash) is identical and both objects are equal to each other (Object#==).

Enumeration follows the order that the corresponding keys were inserted.

NOTE When using mutable data types as keys, changing the value of a key after it was inserted into the Hash may lead to undefined behaviour. This can be restored by re-indexing the hash with #rehash.

Creates a new empty Hash where the default_value is returned if a key is missing.

Reads a Hash from the given pull parser.

Creates a new empty Hash.

Creates a new empty Hash with a block for handling missing keys.

Creates a new empty Hash with a block that handles missing keys.

Zips two arrays into a Hash, taking keys from ary1 and values from ary2.

Returns the value for the key given by key.

Sets the value of key to the given value.

Returns the value for the key given by key.

Empties a Hash and returns it.

Similar to #dup, but duplicates the values as well.

Returns new Hash without nil values.

Removes all nil value from self.

Makes this hash compare keys using their object identity (object_id) for types that define such method (Reference types, but also structs that might wrap other Reference types and delegate the object_id method to them).

Returns true if this Hash is comparing keys by object_id.

Deletes the key-value pair and returns the value, otherwise returns nil.

Deletes the key-value pair and returns the value, else yields key with given block.

Traverses the depth of a structure and returns the value, otherwise raises KeyError.

Traverses the depth of a structure and returns the value.

Calls the given block for each key-value pair and passes in the key and the value.

Returns an iterator over the hash entries.

Calls the given block for each key-value pair and passes in the key.

Returns an iterator over the hash keys.

Calls the given block for each key-value pair and passes in the value.

Returns an iterator over the hash values.

Returns true when hash contains no key-value pairs.

Returns the value for the key given by key, or when not found the value given by default.

Returns the value for the key given by key, or when not found calls the given block with the key.

Returns the first key in the hash.

Returns the first key if it exists, or returns nil.

Returns the first value in the hash.

Returns the first value if it exists, or returns nil.

Returns true when key given by key exists, otherwise false.

Returns true when value given by value exists, otherwise false.

See Object#hash(hasher)

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Inverts keys and values.

Returns a key with the given value, else raises KeyError.

Returns a key with the given value, else yields value with the given block.

Returns a key with the given value, else nil.

Returns a new Array with all the keys.

Returns the last key in the hash.

Returns the last key if it exists, or returns nil.

Returns the last value in the hash.

Returns the last value if it exists, or returns nil.

Returns a new Hash with the keys and values of this hash and other combined.

Similar to #merge, but the receiver is modified.

Adds the contents of other to this hash.

Returns true if self is a subset of other.

Returns true if other is a subset of self or equals to self.

Sets the value of key to the given value.

Sets the value of key to the given value, unless a value for key already exists.

Sets the value of key to the value returned by the given block, unless a value for key already exists.

Rebuilds the hash table based on the current keys.

Returns a new hash consisting of entries for which the block is falsey.

Returns a new Hash without the given keys.

Equivalent to Hash#reject, but makes modification on the current object rather than returning a new one.

Removes a list of keys out of hash.

Removes a list of keys out of hash.

Returns a new hash consisting of entries for which the block is truthy.

Returns a new Hash with the given keys.

Returns a new Hash with the given keys.

Equivalent to Hash#select but makes modification on the current object rather than returning a new one.

Removes every element except the given ones.

Removes every element except the given ones.

Removes every element except the given ones.

Deletes and returns the first key-value pair in the hash, or raises IndexError if the hash is empty.

Deletes and returns the first key-value pair in the hash.

Same as #shift, but returns nil if the hash is empty.

Returns the number of elements in this Hash.

Returns true if self is a subset of other or equals to other.

Returns true if other is a subset of self.

Returns an Array of Tuple(K, V) with key and values belonging to this Hash.

Returns an Array with the results of running block against tuples with key and values belonging to this Hash.

Serializes this Hash into JSON.

Converts to a String.

Returns a new hash with all keys converted using the block operation.

Returns a new hash with the results of running block once for every value.

Destructively transforms all values using a block.

Updates the current value of key with the value returned by the given block (the current value is used as input for the block).

Returns only the values as an Array.

Returns a tuple populated with the values of the given keys, with the same order.

Creates a new empty Hash where the default_value is returned if a key is missing.

WARNING When the default value gets returned on a missing key, it is not stored into the hash under that key. If you want that behaviour, please use the overload with a block.

WARNING The default value is returned as-is. It gets neither duplicated nor cloned. For types with reference semantics this means it will be exactly the same object every time.

The initial_capacity is useful to avoid unnecessary reallocations of the internal buffer in case of growth. If the number of elements a hash will hold is known, the hash should be initialized with that capacity for improved performance. Otherwise, the default is 8. Inputs lower than 8 are ignored.

Reads a Hash from the given pull parser.

Keys are read by invoking from_json_object_key? on this hash's key type (K), which must return a value of type K or nil. If nil is returned a JSON::ParseException is raised.

Values are parsed using the regular .new(pull : JSON::PullParser) method.

Creates a new empty Hash.

Creates a new empty Hash with a block for handling missing keys.

The initial_capacity is useful to avoid unnecessary reallocations of the internal buffer in case of growth. If the number of elements a hash will hold is known, the hash should be initialized with that capacity for improved performance. Otherwise, the default is 8. Inputs lower than 8 are ignored.

Creates a new empty Hash with a block that handles missing keys.

WARNING When the default block is invoked on a missing key, its return value is not implicitly stored into the hash under that key. If you want that behaviour, you need to store it explicitly:

The initial_capacity is useful to avoid unnecessary reallocations of the internal buffer in case of growth. If the number of elements a hash will hold is known, the hash should be initialized with that capacity for improved performance. Otherwise, the default is 8. Inputs lower than 8 are ignored.

Zips two arrays into a Hash, taking keys from ary1 and values from ary2.

Compares with other. Returns true if all key-value pairs are the same.

Returns the value for the key given by key. If not found, returns the default value given by Hash.new, otherwise raises KeyError.

Sets the value of key to the given value.

Returns the value for the key given by key. If not found, returns nil. This ignores the default value set by Hash.new.

Empties a Hash and returns it.

Similar to #dup, but duplicates the values as well.

Returns new Hash without nil values.

Removes all nil value from self. Returns self.

Makes this hash compare keys using their object identity (object_id) for types that define such method (Reference types, but also structs that might wrap other Reference types and delegate the object_id method to them).

Returns true if this Hash is comparing keys by object_id.

See #compare_by_identity.

Deletes the key-value pair and returns the value, otherwise returns nil.

Deletes the key-value pair and returns the value, else yields key with given block.

Traverses the depth of a structure and returns the value, otherwise raises KeyError.

Traverses the depth of a structure and returns the value. Returns nil if not found.

Calls the given block for each key-value pair and passes in the key and the value.

The enumeration follows the order the keys were inserted.

Returns an iterator over the hash entries. Which behaves like an Iterator returning a Tuple consisting of the key and value types.

The enumeration follows the order the keys were inserted.

Calls the given block for each key-value pair and passes in the key.

The enumeration follows the order the keys were inserted.

Returns an iterator over the hash keys. Which behaves like an Iterator consisting of the key's types.

The enumeration follows the order the keys were inserted.

Calls the given block for each key-value pair and passes in the value.

The enumeration follows the order the keys were inserted.

Returns an iterator over the hash values. Which behaves like an Iterator consisting of the value's types.

The enumeration follows the order the keys were inserted.

Returns true when hash contains no key-value pairs.

Returns the value for the key given by key, or when not found the value given by default. This ignores the default value set by Hash.new.

Returns the value for the key given by key, or when not found calls the given block with the key.

Returns the first key in the hash.

Returns the first key if it exists, or returns nil.

Returns the first value in the hash.

Returns the first value if it exists, or returns nil.

Returns true when key given by key exists, otherwise false.

Returns true when value given by value exists, otherwise false.

See Object#hash(hasher)

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Inverts keys and values. If there are duplicated values, the last key becomes the new value.

Returns a key with the given value, else raises KeyError.

Returns a key with the given value, else yields value with the given block.

Returns a key with the given value, else nil.

Returns a new Array with all the keys.

Returns the last key in the hash.

Returns the last key if it exists, or returns nil.

Returns the last value in the hash.

Returns the last value if it exists, or returns nil.

Returns a new Hash with the keys and values of this hash and other combined. A value in other takes precedence over the one in this hash.

Similar to #merge, but the receiver is modified.

Adds the contents of other to this hash. If a key exists in both hashes, the given block is called to determine the value to be used. The block arguments are the key, the value in self and the value in other.

Returns true if self is a subset of other.

Returns true if other is a subset of self or equals to self.

Sets the value of key to the given value.

If a value already exists for key, that (old) value is returned. Otherwise the given block is invoked with key and its value is returned.

Sets the value of key to the given value, unless a value for key already exists.

If a value already exists for key, that (old) value is returned. Otherwise value is returned.

Sets the value of key to the value returned by the given block, unless a value for key already exists.

If a value already exists for key, that (old) value is returned. Otherwise the given block is invoked with key and its value is returned.

hash.put_if_absent(key) { value } is a more performant alternative to hash[key] ||= value that also works correctly when the hash may contain falsey values.

Rebuilds the hash table based on the current keys.

When using mutable data types as keys, modifying a key after it was inserted into the Hash may lead to undefined behaviour. This method re-indexes the hash using the current keys.

Returns a new hash consisting of entries for which the block is falsey.

Returns a new Hash without the given keys.

Equivalent to Hash#reject, but makes modification on the current object rather than returning a new one. Returns self.

Removes a list of keys out of hash.

Removes a list of keys out of hash.

Returns a new hash consisting of entries for which the block is truthy.

Returns a new Hash with the given keys.

Returns a new Hash with the given keys.

Equivalent to Hash#select but makes modification on the current object rather than returning a new one. Returns self.

Removes every element except the given ones.

Removes every element except the given ones.

Removes every element except the given ones.

Deletes and returns the first key-value pair in the hash, or raises IndexError if the hash is empty.

Deletes and returns the first key-value pair in the hash. Yields to the given block if the hash is empty.

Same as #shift, but returns nil if the hash is empty.

Returns the number of elements in this Hash.

Returns true if self is a subset of other or equals to other.

Returns true if other is a subset of self.

Returns an Array of Tuple(K, V) with key and values belonging to this Hash.

The order of the array follows the order the keys were inserted in the Hash.

Returns an Array with the results of running block against tuples with key and values belonging to this Hash.

The order of the array follows the order the keys were inserted in the Hash.

Serializes this Hash into JSON.

Keys are serialized by invoking to_json_object_key on them. Values are serialized with the usual #to_json(json : JSON::Builder) method.

Converts to a String.

Returns a new hash with all keys converted using the block operation. The block can change a type of keys. The block yields the key and value.

Returns a new hash with the results of running block once for every value. The block can change a type of values. The block yields the value and key.

Destructively transforms all values using a block. Same as transform_values but modifies in place. The block cannot change a type of values. The block yields the value and key.

See #update for updating a single value.

Updates the current value of key with the value returned by the given block (the current value is used as input for the block).

If no entry for key is present, but there's a default value (or default block) then that default value is used as input for the given block.

If no entry for key is present and the hash has no default value, it raises KeyError.

It returns the value used as input for the given block (ie. the old value if key present, or the default value)

See #transform_values! for updating all the values.

Returns only the values as an Array.

Returns a tuple populated with the values of the given keys, with the same order. Raises if a key is not found.

**Examples:**

Example 1 (markdown):
```markdown
# Create a new Hash for mapping String to Int32
hash = Hash(String, Int32).new
hash["one"] = 1
hash["two"] = 2
hash["one"] # => 1
```

Example 2 (json):
```json
{"one" => 1, "two" => 2}
```

Example 3 (javascript):
```javascript
inventory = Hash(String, Int32).new(0)
inventory["socks"] = 3
inventory["pickles"] # => 0
```

Example 4 (javascript):
```javascript
hash = Hash(String, Array(Int32)).new([1])
hash["a"][0] = 2
hash["b"] # => [2]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/Cookies.html

**Contents:**
- class HTTP::Cookies
- Overview
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Enumerable(HTTP::Cookie)
  - Class methods inherited from module Enumerable(HTTP::Cookie)
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference

Represents a collection of cookies as it can be present inside a HTTP request or response.

NOTE To use Cookies, you must explicitly import it with require "http/cookie"

Creates a new instance by parsing the Cookie headers in the given HTTP::Headers.

Creates a new instance by parsing the Cookie and Set-Cookie headers in the given HTTP::Headers.

DEPRECATED Use .from_client_headers or .from_server_headers instead.

Creates a new instance by parsing the Set-Cookie headers in the given HTTP::Headers.

Creates a new empty instance.

Adds the given cookie to this collection, overrides an existing cookie with the same name if present.

Returns true if this reference is the same as other.

Gets the current HTTP::Cookie for the given key.

Sets a new cookie in the collection with a string value.

Sets a new cookie in the collection to the given HTTP::Cookie instance.

Gets the current HTTP::Cookie for the given key or nil if none is set.

Adds Cookie headers for the cookies in this collection to the given HTTP::Headers instance and returns it.

Adds Set-Cookie headers for the cookies in this collection to the given HTTP::Headers instance and returns it.

Clears the collection, removing all cookies.

Deletes and returns the HTTP::Cookie for the specified key, or returns nil if key cannot be found in the collection.

Yields each HTTP::Cookie in the collection.

Returns an iterator over the cookies of this collection.

Whether the collection contains any cookies.

Filling cookies by parsing the Cookie headers in the given HTTP::Headers.

Filling cookies by parsing the Cookie and Set-Cookie headers in the given HTTP::Headers.

DEPRECATED Use #fill_from_client_headers or #fill_from_server_headers instead.

Filling cookies by parsing the Set-Cookie headers in the given HTTP::Headers.

Returns true if a cookie with the given key exists.

See Object#hash(hasher)

Returns a string representation of this cookies list.

Returns a string representation of this cookies list.

Returns the number of cookies contained in this collection.

Returns this collection as a plain Hash.

Returns a string representation of this cookies list.

Creates a new instance by parsing the Cookie headers in the given HTTP::Headers.

See HTTP::Client::Response#cookies.

Creates a new instance by parsing the Cookie and Set-Cookie headers in the given HTTP::Headers.

See HTTP::Request#cookies and HTTP::Client::Response#cookies.

DEPRECATED Use .from_client_headers or .from_server_headers instead.

Creates a new instance by parsing the Set-Cookie headers in the given HTTP::Headers.

See HTTP::Request#cookies.

Creates a new empty instance.

Adds the given cookie to this collection, overrides an existing cookie with the same name if present.

Returns true if this reference is the same as other. Invokes same?.

Gets the current HTTP::Cookie for the given key.

Sets a new cookie in the collection with a string value. This creates a never expiring, insecure, not HTTP-only cookie with no explicit domain restriction and no path.

Sets a new cookie in the collection to the given HTTP::Cookie instance. The name attribute must match the given key, else ArgumentError is raised.

Gets the current HTTP::Cookie for the given key or nil if none is set.

Adds Cookie headers for the cookies in this collection to the given HTTP::Headers instance and returns it. Removes any existing Cookie headers in it.

Adds Set-Cookie headers for the cookies in this collection to the given HTTP::Headers instance and returns it. Removes any existing Set-Cookie headers in it.

Clears the collection, removing all cookies.

Deletes and returns the HTTP::Cookie for the specified key, or returns nil if key cannot be found in the collection. Note that key should match the name attribute of the desired HTTP::Cookie.

Yields each HTTP::Cookie in the collection.

Returns an iterator over the cookies of this collection.

Whether the collection contains any cookies.

Filling cookies by parsing the Cookie headers in the given HTTP::Headers.

Filling cookies by parsing the Cookie and Set-Cookie headers in the given HTTP::Headers.

DEPRECATED Use #fill_from_client_headers or #fill_from_server_headers instead.

Filling cookies by parsing the Set-Cookie headers in the given HTTP::Headers.

Returns true if a cookie with the given key exists.

See Object#hash(hasher)

Returns a string representation of this cookies list.

It uses the Set-Cookie serialization from Cookie#to_set_cookie_header which represents the full state of the cookie.

Returns a string representation of this cookies list.

It uses the Set-Cookie serialization from Cookie#to_set_cookie_header which represents the full state of the cookie.

Returns the number of cookies contained in this collection.

Returns this collection as a plain Hash.

Returns a string representation of this cookies list.

It uses the Set-Cookie serialization from Cookie#to_set_cookie_header which represents the full state of the cookie.

**Examples:**

Example 1 (julia):
```julia
response.cookies << HTTP::Cookie.new("foo", "bar", http_only: true)
```

Example 2 (javascript):
```javascript
request.cookies["foo"].value # => "bar"
```

Example 3 (julia):
```julia
require "http/client"

request = HTTP::Request.new "GET", "/"
request.cookies["foo"] = "bar"
```

Example 4 (julia):
```julia
require "http/client"

response = HTTP::Client::Response.new(200)
response.cookies["foo"] = HTTP::Cookie.new("foo", "bar", "/admin", Time.utc + 12.hours, secure: true)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/Target.html

**Contents:**
- struct LLVM::Target
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Appends this struct's name and instance variables names and values to the given IO.

Same as #inspect(io).

Appends this struct's name and instance variables names and values to the given IO.

Same as #inspect(io).

**Examples:**

Example 1 (python):
```python
struct Point
  def initialize(@x : Int32, @y : Int32)
  end
end

p1 = Point.new 1, 2
p1.to_s    # "Point(@x=1, @y=2)"
p1.inspect # "Point(@x=1, @y=2)"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Complex.html

**Contents:**
- struct Complex
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

A complex number is a number represented in the form a + bi. In this form, a and b are real numbers, and i is an imaginary number such as i² = -1. The a is the real part of the number, and the b is the imaginary part of the number.

NOTE To use Complex, you must explicitly import it with require "complex"

Returns the number 0 in complex form.

Multiplies self by other.

Multiplies self by other.

Adds the value of self to other.

Adds the value of self to other.

Removes the value of other from self.

Removes the value of other from self.

Returns the opposite of self.

Divides self by other.

Divides self by other.

Determines whether self equals other or not.

Determines whether self equals other or not.

Determines whether self equals other or not.

Returns the absolute value of this complex number in a number form, using the Pythagorean theorem.

Returns the square of absolute value in a number form.

Returns the conjugate of self.

See Object#hash(hasher)

Returns the imaginary part.

Writes this complex object to an io, surrounded by parentheses.

Returns the inverse of self.

Returns the phase of self.

Returns a Tuple with the #abs value and the #phase.

Returns the real part.

Rounds to the nearest digits.

Returns the complex sign of self.

Returns the value as a Float64 if possible (the imaginary part should be exactly zero), raises otherwise.

Writes this complex object to an io.

Returns true if the complex number is zero.

Returns the number 0 in complex form.

Multiplies self by other.

Multiplies self by other.

Adds the value of self to other.

Adds the value of self to other.

Removes the value of other from self.

Removes the value of other from self.

Returns the opposite of self.

Divides self by other.

Divides self by other.

Determines whether self equals other or not.

Determines whether self equals other or not.

Determines whether self equals other or not.

Returns the absolute value of this complex number in a number form, using the Pythagorean theorem.

Returns the square of absolute value in a number form.

Returns the conjugate of self.

See Object#hash(hasher)

Returns the imaginary part.

Writes this complex object to an io, surrounded by parentheses.

Returns the inverse of self.

Returns the phase of self.

Returns a Tuple with the #abs value and the #phase.

Returns the real part.

Rounds to the nearest digits.

Returns the complex sign of self.

If self is non-zero, the returned value has the same phase as self and absolute value 1.0. If self is zero, returns self.

The returned value's real and imaginary components always have the same signs as the respective components of self.

Returns the value as a Float64 if possible (the imaginary part should be exactly zero), raises otherwise.

Writes this complex object to an io.

Returns true if the complex number is zero. This means the real and imaginary are both zero.

**Examples:**

Example 1 (javascript):
```javascript
require "complex"

Complex.new(1, 0)   # => 1.0 + 0.0.i
Complex.new(5, -12) # => 5.0 - 12.0.i

1.to_c # => 1.0 + 0.0.i
1.i    # => 0.0 + 1.0.i
```

Example 2 (javascript):
```javascript
require "complex"

Complex.new(42, 2).abs  # => 42.04759208325728
Complex.new(-42, 2).abs # => 42.04759208325728
```

Example 3 (javascript):
```javascript
require "complex"

Complex.new(42, 2).abs2 # => 1768
```

Example 4 (javascript):
```javascript
require "complex"

Complex.new(42, 2).conj  # => 42.0 - 2.0.i
Complex.new(42, -2).conj # => 42.0 + 2.0.i
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/Handler.html

**Contents:**
- module HTTP::Handler
- Overview
  - A custom handler
- Direct including types
- Defined in:
- Instance Method Summary
- Instance Method Detail

A handler is a class which includes HTTP::Handler and implements the #call method. You can use a handler to intercept any incoming request and can modify the response. These can be used for request throttling, ip-based filtering, adding custom headers e.g.

NOTE To use Handler, you must explicitly import it with require "http/server/handler"

**Examples:**

Example 1 (php):
```php
require "http/server/handler"

class CustomHandler
  include HTTP::Handler

  def call(context)
    puts "Doing some stuff"
    call_next(context)
  end
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Fiber/ExecutionContext.html

**Contents:**
- module Fiber::ExecutionContext
- Overview
- Context types
- The default execution context
- Direct including types
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
- Constructor Detail

An execution context creates and manages a dedicated pool of 1 or more schedulers where fibers will be running in. Each context manages the rules to run, suspend and swap fibers internally.

EXPERIMENTAL Execution contexts are an experimental feature, implementing RFC 2. It's opt-in and requires the compiler flags -Dpreview_mt -Dexecution_context.

Applications can create any number of execution contexts in parallel. These contexts are isolated but they can communicate with the usual synchronization primitives such as Channel or Mutex.

An execution context groups fibers together. Instead of associating a fiber to a specific system thread, we associate a fiber to an execution context, abstracting which system thread(s) the fibers will run on.

When spawning a fiber with ::spawn, it spawns into the execution context of the current fiber, so child fibers execute in the same context as their parent (unless told otherwise).

Once spawned, a fiber cannot move to another execution context. It always resumes in the same execution context.

The standard library provides a number of execution context implementations for common use cases.

The Crystal runtime starts a default execution context exposed as Fiber::ExecutionContext.default. This is where the main fiber is running.

Its parallelism is set to 1 for backwards compatibility reasons; Crystal used to be single-threaded and concurrent only. You can increase the parallelism at any time using Parallel#resize, for example:

Returns the ExecutionContext the current fiber is running in.

Returns the default ExecutionContext for the process, automatically started when the program started.

Returns the default maximum parallelism.

Iterates all execution contexts.

Creates a new fiber then calls enqueues it to the execution context.

Returns the ExecutionContext the current fiber is running in.

Returns the default ExecutionContext for the process, automatically started when the program started.

The default execution context is currently Parallel but only starts with parallelism set to 1. The parallelism can be changed using Parallel#resize.

Returns the default maximum parallelism. Can be used to resize the default parallel execution context for example.

Respects the CRYSTAL_WORKERS environment variable if present and valid, and otherwise defaults to the number of logical CPUs available to the process or on the computer.

Iterates all execution contexts.

Creates a new fiber then calls enqueues it to the execution context.

May be called from any ExecutionContext (i.e. must be thread-safe).

**Examples:**

Example 1 (yaml):
```yaml
count = Fiber::ExecutionContext.default_workers_count
Fiber::ExecutionContext.default.resize(count)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/Context.html

**Contents:**
- struct Log::Context
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Clears the current Fiber logging context.

Extends the current Fiber logging context.

Extends the current Fiber logging context.

Clears the current Fiber logging context.

Extends the current Fiber logging context.

Extends the current Fiber logging context.

**Examples:**

Example 1 (css):
```css
Log.context.clear
Log.info { "message with empty context" }
```

Example 2 (typescript):
```typescript
Log.context.set a: 1
Log.context.set b: 2
Log.info { %q(message with a: 1, b: 2 context") }
h = {:c => "3"}
Log.context.set extra: h
Log.info { %q(message with a: 1, b: 2, extra: {"c" => "3"} context) }
h = {"c" => 3}
Log.context.set extra: h
Log.info { %q(message with a: 1, b: 2, extra: {"c" => 3} context) }
```

Example 3 (typescript):
```typescript
Log.context.set a: 1
Log.context.set b: 2
Log.info { %q(message with a: 1, b: 2 context") }
h = {:c => "3"}
Log.context.set extra: h
Log.info { %q(message with a: 1, b: 2, extra: {"c" => "3"} context) }
h = {"c" => 3}
Log.context.set extra: h
Log.info { %q(message with a: 1, b: 2, extra: {"c" => 3} context) }
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Set.html

**Contents:**
- struct Set(T)
- Overview
  - Example
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Iterable(T)
  - Instance methods inherited from module Enumerable(T)
  - Class methods inherited from module Enumerable(T)

Set implements a collection of unordered values with no duplicates.

An Enumerable object can be converted to Set using the #to_set method.

Set uses Hash as storage, so you must note the following points:

Returns the additive identity of this type.

Optimized version of .new used when other is also an Indexable

Creates a new set from the elements in enumerable.

Creates a new, empty Set.

Intersection: returns a new set containing elements common to both sets.

Addition: returns a new set containing the unique elements from both sets.

Difference: returns a new set containing elements in this set that are not present in the other.

Difference: returns a new set containing elements in this set that are not present in the other enumerable.

Returns true if both sets have the same elements.

Symmetric Difference: returns a new set (self - other) | (other - self).

Symmetric Difference: returns a new set (self - other) | (other - self).

Union: returns a new set containing all unique elements from both sets.

Adds object to the set and returns self.

Adds object to the set and returns true on success and false if the value was already in the set.

Removes all elements in the set, and returns self.

Returns a new Set with all of the elements cloned.

Makes this set compare objects using their object identity (object_id) for types that define such method (Reference types, but also structs that might wrap other Reference types and delegate the object_id method to them).

Returns true if this Set is comparing objects by object_id.

Adds #each element of elems to the set and returns self.

Removes the object from the set and returns true if it was present, otherwise returns false.

Returns a new Set with all of the same elements.

Yields each element of the set, and returns nil.

Returns an iterator for each element of the set.

Returns true if the set is empty.

See Object#hash(hasher)

Returns true if object exists in the set.

Returns true if the set and the given set have at least one element in common.

Returns true if the set is a proper subset of the other set.

Returns true if the set is a superset of the other set.

Rebuilds the set based on the current elements.

Deletes every element of the set for which the block is truthy, and returns self.

Deletes every element of the set for which the block is falsey, and returns self.

Returns the number of elements in the set.

Returns true if the set is a subset of the other set.

Returns self after removing from it those elements that are present in the given enumerable.

Returns true if the set is a superset of the other set.

Returns the elements as an Array.

Returns an Array with the results of running block against each element of the collection.

Writes a string representation of the set to io.

Returns the additive identity of this type.

This is an empty set.

Optimized version of .new used when other is also an Indexable

Creates a new set from the elements in enumerable.

Creates a new, empty Set.

An initial capacity can be specified, and it will be set as the initial capacity of the internal Hash.

Intersection: returns a new set containing elements common to both sets.

Addition: returns a new set containing the unique elements from both sets.

Difference: returns a new set containing elements in this set that are not present in the other.

Difference: returns a new set containing elements in this set that are not present in the other enumerable.

Returns true if both sets have the same elements.

It is for convenience with using on case statement.

See also: Object#===.

Symmetric Difference: returns a new set (self - other) | (other - self). Equivalently, returns (self | other) - (self & other).

Symmetric Difference: returns a new set (self - other) | (other - self). Equivalently, returns (self | other) - (self & other).

Union: returns a new set containing all unique elements from both sets.

See also: #concat to add elements from a set to self.

Adds object to the set and returns self.

Adds object to the set and returns true on success and false if the value was already in the set.

Removes all elements in the set, and returns self.

Returns a new Set with all of the elements cloned.

Makes this set compare objects using their object identity (object_id) for types that define such method (Reference types, but also structs that might wrap other Reference types and delegate the object_id method to them).

Returns true if this Set is comparing objects by object_id.

See #compare_by_identity.

Adds #each element of elems to the set and returns self.

See also: #| to merge two sets and return a new one.

Removes the object from the set and returns true if it was present, otherwise returns false.

Returns a new Set with all of the same elements.

Yields each element of the set, and returns nil.

Returns an iterator for each element of the set.

Returns true if the set is empty.

See Object#hash(hasher)

Returns true if object exists in the set.

Returns true if the set and the given set have at least one element in common.

Returns true if the set is a proper subset of the other set.

This set must have fewer elements than the other set, and all of elements in this set must be present in the other set.

Returns true if the set is a superset of the other set.

The other must have fewer elements than this set, and all of elements in the other set must be present in this set.

Rebuilds the set based on the current elements.

When using mutable data types as elements, modifying an elements after it was inserted into the Set may lead to undefined behaviour. This method re-indexes the set using the current elements.

Deletes every element of the set for which the block is truthy, and returns self.

Deletes every element of the set for which the block is falsey, and returns self.

Returns the number of elements in the set.

Returns true if the set is a subset of the other set.

This set must have the same or fewer elements than the other set, and all of elements in this set must be present in the other set.

Returns self after removing from it those elements that are present in the given enumerable.

Returns true if the set is a superset of the other set.

The other must have the same or fewer elements than this set, and all of elements in the other set must be present in this set.

Returns the elements as an Array.

Returns an Array with the results of running block against each element of the collection.

Writes a string representation of the set to io.

**Examples:**

Example 1 (javascript):
```javascript
s1 = Set{1, 2}
s2 = [1, 2].to_set
s3 = Set.new [1, 2]
s1 == s2 # => true
s1 == s3 # => true
s1.add(2)
s1.concat([6, 8])
s1.subset_of? s2 # => false
s2.subset_of? s1 # => true
```

Example 2 (javascript):
```javascript
a = [1, 3, 5]
s = Set.new a
s.empty? # => false
```

Example 3 (javascript):
```javascript
s = Set(Int32).new
s.empty? # => true
```

Example 4 (javascript):
```javascript
Set{1, 1, 3, 5} & Set{1, 2, 3}               # => Set{1, 3}
Set{'a', 'b', 'b', 'z'} & Set{'a', 'b', 'c'} # => Set{'a', 'b'}
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/Orc/LLJITBuilder.html

**Contents:**
- class LLVM::Orc::LLJITBuilder
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

EXPERIMENTAL The C API wrapped by this type is marked as experimental by LLVM.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/SyncDispatcher.html

**Contents:**
- class Log::SyncDispatcher
- Overview
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Log::Dispatcher
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Deliver log entries directly. It uses a mutex to guarantee one entry is delivered at a time.

Dispatch a log entry to the specified backend

Dispatch a log entry to the specified backend

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI/AVR.html

**Contents:**
- class LLVM::ABI::AVR
- Overview
- Defined in:
- Constant Summary
- Constructors
- Instance Method Summary
  - Instance methods inherited from class LLVM::ABI
  - Constructor methods inherited from class LLVM::ABI
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

Follows AVR GCC, while Clang (and Rust) are incompatible, despite LLVM itself being compliant.

Follows AVR GCC, while Clang (and Rust) are incompatible, despite LLVM itself being compliant.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Benchmark.html

**Contents:**
- module Benchmark
- Overview
  - Measure the number of iterations per second of each task
  - Measure the time to construct the string given by the expression: "a"*1_000_000_000
  - Do some experiments sequentially using the #bm method:
- Extended Modules
- Defined in:
- Instance Method Summary
- Instance Method Detail

The Benchmark module provides methods for benchmarking Crystal code, giving detailed reports on the time and memory taken for each task.

NOTE To use Benchmark, you must explicitly import it with require "benchmark"

This generates the following output showing the mean iterations per second, the mean times per iteration, the standard deviation relative to the mean, and a comparison:

Benchmark::IPS defaults to 2 seconds of warmup time and 5 seconds of calculation time. This can be configured:

This generates the following output:

This report shows the user CPU time, system CPU time, the sum of the user and system CPU times, and the elapsed real time. The unit of time is seconds.

NOTE Make sure to always benchmark code by compiling with the --release flag.

Main interface of the Benchmark module.

Instruction per second interface of the Benchmark module.

Instruction per second interface of the Benchmark module.

DEPRECATED Use #ips(Time::Span, Time::Span, Bool, &) instead.

Returns the time used to execute the given block.

Returns the memory in bytes that the given block consumes.

Returns the elapsed real time used to execute the given block.

Main interface of the Benchmark module. Yields a Job to which one can report the benchmarks. See the module's description.

Instruction per second interface of the Benchmark module. Yields a Job to which one can report the benchmarks. See the module's description.

The optional parameters calculation and warmup set the duration of those stages. For more detail on these stages see Benchmark::IPS. When the interactive parameter is true, results are displayed and updated as they are calculated, otherwise all at once after they finished.

Instruction per second interface of the Benchmark module. Yields a Job to which one can report the benchmarks. See the module's description.

The optional parameters calculation and warmup set the duration of those stages in seconds. For more detail on these stages see Benchmark::IPS. When the interactive parameter is true, results are displayed and updated as they are calculated, otherwise all at once after they finished.

DEPRECATED Use #ips(Time::Span, Time::Span, Bool, &) instead.

Returns the time used to execute the given block.

Returns the memory in bytes that the given block consumes.

Returns the elapsed real time used to execute the given block.

**Examples:**

Example 1 (julia):
```julia
require "benchmark"

Benchmark.ips do |x|
  x.report("short sleep") { sleep 10.milliseconds }
  x.report("shorter sleep") { sleep 1.millisecond }
end
```

Example 2 (unknown):
```unknown
short sleep   88.7  ( 11.27ms) (± 3.33%)  8.90× slower
shorter sleep  789.7  (  1.27ms) (± 3.02%)       fastest
```

Example 3 (julia):
```julia
require "benchmark"

Benchmark.ips(warmup: 4, calculation: 10) do |x|
  x.report("sleep") { sleep 10.milliseconds }
end
```

Example 4 (css):
```css
require "benchmark"

puts Benchmark.measure { "a"*1_000_000_000 }
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Socket/Address.html

**Contents:**
- abstract struct Socket::Address
- Direct Known Subclasses
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Returns either an IPAddress or UNIXAddress from the internal OS representation.

Returns either an IPAddress or UNIXAddress from the internal OS representation.

Parses a Socket::Address from an URI.

Parses a Socket::Address from an URI.

Returns either an IPAddress or UNIXAddress from the internal OS representation. Only INET, INET6 and UNIX families are supported.

Returns either an IPAddress or UNIXAddress from the internal OS representation. Only INET, INET6 and UNIX families are supported.

Parses a Socket::Address from an URI.

See IPAddress.parse and UNIXAddress.parse for details.

Parses a Socket::Address from an URI.

See IPAddress.parse and UNIXAddress.parse for details.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/FormData/Builder.html

**Contents:**
- class HTTP::FormData::Builder
- Overview
  - Example
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Builds a multipart/form-data message.

Creates a new FormData::Builder which writes to io, using the multipart boundary boundary.

Returns a content type header with correct boundary parameter.

Adds a form part with the given name and value.

Adds a form part called name, with data from io as the value.

Finalizes the multipart message, this method must be called before the generated multipart message written to the IO is considered valid.

Creates a new FormData::Builder which writes to io, using the multipart boundary boundary.

Returns a content type header with correct boundary parameter.

Adds a form part with the given name and value. Headers can optionally be provided for the form part.

Adds a form part called name, with data from io as the value. Metadata can be provided to add extra metadata about the file to the Content-Disposition header for the form part. Other headers can be added using headers.

Finalizes the multipart message, this method must be called before the generated multipart message written to the IO is considered valid.

**Examples:**

Example 1 (javascript):
```javascript
require "http"

io = IO::Memory.new
builder = HTTP::FormData::Builder.new(io, "aA47")
builder.field("name", "joe")
file = IO::Memory.new("file contents")
builder.file("upload", file, HTTP::FormData::FileMetadata.new(filename: "test.txt"))
builder.finish
io.to_s # => "--aA47\r\nContent-Disposition: form-data; name=\"name\"\r\n\r\njoe\r\n--aA47\r\nContent-Disposition: form-data; name=\"upload\"; filename=\"test.txt\"\r\n\r\nfile contents\r\n--aA47--"
```

Example 2 (javascript):
```javascript
builder = HTTP::FormData::Builder.new(io, "a4VF")
builder.content_type # => "multipart/form-data; boundary=\"a4VF\""
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Channel.html

**Contents:**
- class Channel(T)
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

A Channel enables concurrent communication between fibers.

They allow communicating data between fibers without sharing memory and without having to worry about locks, semaphores or other special structures.

NOTE Although a Channel(Nil) or any other nilable types like Channel(Int32?) are valid they are discouraged since from certain methods or constructs it receiving a nil as data will be indistinguishable from a closed channel.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Receives a value from the channel.

Receives a value from the channel.

Sends a value to the channel.

Closes the channel. The method prevents any new value from being sent to the channel.

If the channel has buffered values, then subsequent calls to #receive will succeed and consume the buffer until it is empty.

All fibers blocked in #send or #receive will be awakened with Channel::ClosedError. All subsequent calls to #send will consider the channel closed. Subsequent calls to #receive will consider the channel closed if the buffer is empty.

Calling #close on a closed channel does not have any effect.

It returns true when the channel was successfully closed, or false if it was already closed.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Receives a value from the channel. If there is a value waiting, then it is returned immediately. Otherwise, this method blocks until a value is sent to the channel.

Raises ClosedError if the channel is closed or closes while waiting for receive.

Receives a value from the channel. If there is a value waiting, it is returned immediately. Otherwise, this method blocks until a value is sent to the channel.

Returns nil if the channel is closed or closes while waiting for receive.

Sends a value to the channel. If the channel has spare capacity, then the method returns immediately. Otherwise, this method blocks the calling fiber until another fiber calls #receive on the channel.

Raises ClosedError if the channel is closed or closes while waiting on a full channel.

**Examples:**

Example 1 (javascript):
```javascript
channel = Channel(Int32).new

spawn do
  channel.send(0)
  channel.send(1)
end

channel.receive # => 0
channel.receive # => 1
```

Example 2 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).inspect # => #<Person:0x10fd31f20 @name="John", @age=32>
```

Example 3 (javascript):
```javascript
channel = Channel(Int32).new
spawn do
  channel.send(1)
end
channel.receive # => 1
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTML.html

**Contents:**
- module HTML
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

Provides HTML escaping and unescaping methods.

For HTML parsing see module XML, especially XML.parse_html.

NOTE To use HTML, you must explicitly import it with require "html"

Same as .escape(string) but outputs the result to the given io.

Same as .escape(String, IO) but accepts Bytes instead of String.

Escapes special characters in HTML, namely &, <, >, " and '.

Returns a string where named and numeric character references (e.g.

Same as .escape(string) but outputs the result to the given io.

Same as .escape(String, IO) but accepts Bytes instead of String.

The slice is assumed to be valid UTF-8.

Escapes special characters in HTML, namely &, <, >, " and '.

Returns a string where named and numeric character references (e.g. &gt;, &#62;, &#x3e;) in string are replaced with the corresponding unicode characters. This method decodes all HTML5 entities including those without a trailing semicolon (such as "&copy").

**Examples:**

Example 1 (javascript):
```javascript
require "html"

io = IO::Memory.new
HTML.escape("Crystal & You", io) # => nil
io.to_s                          # => "Crystal &amp; You"
```

Example 2 (javascript):
```javascript
require "html"

HTML.escape("Crystal & You") # => "Crystal &amp; You"
```

Example 3 (javascript):
```javascript
require "html"

HTML.unescape("Crystal &amp; You") # => "Crystal & You"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Socket/IPAddress.html

**Contents:**
- struct Socket::IPAddress
- Overview
- Defined in:
- Constant Summary
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from struct Socket::Address
  - Constructor methods inherited from struct Socket::Address
  - Instance methods inherited from struct Struct

IP address representation.

Holds a binary representation of an IP address, either translated from a String, or directly received from an opened connection (e.g. Socket#local_address, Socket#receive).

IPAddress won't resolve domains, including localhost. If you must resolve an IP, or don't know whether a String contains an IP or a domain name, you should use Addrinfo.resolve instead.

Creates an IPAddress from the internal OS representation.

Creates an IPAddress from the internal OS representation.

Creates an IPAddress from the given IPv4 or IPv6 address and port number.

Parses a Socket::IPAddress from an URI.

Parses a Socket::IPAddress from an URI.

Returns the IPv4 address x0.x1.x2.x3:port.

Returns the IPv4 address with the given address fields and port number.

Returns the IPv4-mapped IPv6 address [::ffff:x0.x1.x2.x3]:port.

Returns the IPv4-mapped IPv6 address with the given IPv4 address fields and port number.

Returns the IPv6 address [x0:x1:x2:x3:x4:x5:x6:x7]:port.

Returns the IPv6 address with the given address fields, port number and scope identifier.

Parses str as an IPv4 address and returns its fields, or returns nil if str does not contain a valid IPv4 address.

Parses str as an IPv6 address and returns its fields, or returns nil if str does not contain a valid IPv6 address.

Returns true if address is a valid IPv4 or IPv6 address.

Returns true if port is a valid port number.

Returns true if address is a valid IPv4 address.

Returns true if address is a valid IPv6 address.

Returns a String representation of the IP address, without the port number.

See Object#hash(hasher)

Appends this struct's name and instance variables names and values to the given IO.

Returns an unambiguous and information-rich string representation of this object, typically intended for developers.

Returns true if this IP is a link-local address.

Returns the interface name for a scoped/zoned link-local IPv6 address.

Returns true if this IP is a loopback address.

Returns true if this IP is a private address.

Writes the String representation of the IP address plus the port number to the given io.

Returns a String representation of the IP address plus the port number.

Returns true if this IP is an unspecified address, either the IPv4 address 0.0.0.0 or the IPv6 address ::.

Creates an IPAddress from the internal OS representation. Supports both INET and INET6 families.

Creates an IPAddress from the internal OS representation. Supports both INET and INET6 families.

Creates an IPAddress from the given IPv4 or IPv6 address and port number.

address is parsed using .parse_v4_fields? and .parse_v6_fields?. Raises Socket::Error if address does not contain a valid IP address or the port number is out of range.

Scoped/Zoned IPv6 link-local addresses are supported per RFC4007, e.g. fe80::abcd%eth0 but will always use their numerical interface index in the #inspect representation. The interface name can be retrieved later using #link_local_interface on the IPAddress object.

Parses a Socket::IPAddress from an URI.

It expects the URI to include <scheme>://<host>:<port> where scheme as well as any additional URI components (such as path or query) are ignored.

host must be an IP address (v4 or v6), otherwise Socket::Error will be raised. Domain names will not be resolved.

Parses a Socket::IPAddress from an URI.

It expects the URI to include <scheme>://<host>:<port> where scheme as well as any additional URI components (such as path or query) are ignored.

host must be an IP address (v4 or v6), otherwise Socket::Error will be raised. Domain names will not be resolved.

Returns the IPv4 address x0.x1.x2.x3:port.

Raises Socket::Error if any field or the port number is out of range.

Returns the IPv4 address with the given address fields and port number.

Returns the IPv4-mapped IPv6 address [::ffff:x0.x1.x2.x3]:port.

Raises Socket::Error if any field or the port number is out of range.

Returns the IPv4-mapped IPv6 address with the given IPv4 address fields and port number.

Returns the IPv6 address [x0:x1:x2:x3:x4:x5:x6:x7]:port.

Raises Socket::Error if any field or the port number is out of range.

Returns the IPv6 address with the given address fields, port number and scope identifier.

Parses str as an IPv4 address and returns its fields, or returns nil if str does not contain a valid IPv4 address.

The format of IPv4 addresses follows RFC 3493, section 6.3. No extensions (e.g. octal fields, fewer than 4 fields) are supported.

Parses str as an IPv6 address and returns its fields, or returns nil if str does not contain a valid IPv6 address.

The format of IPv6 addresses follows RFC 4291, section 2.2. Both canonical and non-canonical forms are supported.

Returns true if address is a valid IPv4 or IPv6 address.

Returns true if port is a valid port number.

Valid port numbers are in the range 0..65_535.

Returns true if address is a valid IPv4 address.

Returns true if address is a valid IPv6 address.

Returns a String representation of the IP address, without the port number.

IPv6 addresses are canonicalized according to RFC 5952, section 4. IPv4-mapped IPv6 addresses use the mixed notation according to RFC 5952, section 5.

To obtain both the address and the port number in one string, see #to_s.

See Object#hash(hasher)

Appends this struct's name and instance variables names and values to the given IO.

Returns an unambiguous and information-rich string representation of this object, typically intended for developers.

This method should usually not be overridden. It delegates to #inspect(IO) which can be overridden for custom implementations.

Returns true if this IP is a link-local address.

IPv4 addresses in 169.254.0.0/16 reserved by RFC 3927 and Link-Local IPv6 Unicast Addresses in fe80::/10 reserved by RFC 4291 are considered link-local.

Returns the interface name for a scoped/zoned link-local IPv6 address. This only works on properly initialized link-local IPv6 address objects. In any other case this will return nil.

The OS tracks the zone via a numerical interface index as enumerated by the kernel. To keep our abstraction class in line, we also only keep the interface index around.

This helper method exists to look up the interface name based on the associated zone_id property.

Returns true if this IP is a loopback address.

In the IPv4 family, loopback addresses are all addresses in the subnet 127.0.0.0/24. In IPv6 ::1 is the loopback address.

Returns true if this IP is a private address.

IPv4 addresses in 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 as defined in RFC 1918 and IPv6 Unique Local Addresses in fc00::/7 as defined in RFC 4193 are considered private.

Writes the String representation of the IP address plus the port number to the given io.

IPv6 addresses are canonicalized according to RFC 5952, section 4, and surrounded within a pair of square brackets according to RFC 3986. IPv4-mapped IPv6 addresses use the mixed notation according to RFC 5952, section 5.

To obtain the address alone without the port number, see #address.

Returns a String representation of the IP address plus the port number.

IPv6 addresses are canonicalized according to RFC 5952, section 4, and surrounded within a pair of square brackets according to RFC 3986. IPv4-mapped IPv6 addresses use the mixed notation according to RFC 5952, section 5.

To obtain the address alone without the port number, see #address.

Returns true if this IP is an unspecified address, either the IPv4 address 0.0.0.0 or the IPv6 address ::.

**Examples:**

Example 1 (yaml):
```yaml
require "socket"

Socket::IPAddress.new("127.0.0.1", 8080)                 # => Socket::IPAddress(127.0.0.1:8080)
Socket::IPAddress.new("fe80::2ab2:bdff:fe59:8e2c", 1234) # => Socket::IPAddress([fe80::2ab2:bdff:fe59:8e2c]:1234)
Socket::IPAddress.new("fe80::4567:8:9%eth0", 443)        # => Socket::IPAddress([fe80::4567:8:9%2]:443)
```

Example 2 (yaml):
```yaml
require "socket"

Socket::IPAddress.parse("tcp://127.0.0.1:8080") # => Socket::IPAddress.new("127.0.0.1", 8080)
Socket::IPAddress.parse("udp://[::1]:8080")     # => Socket::IPAddress.new("::1", 8080)
```

Example 3 (yaml):
```yaml
require "socket"

Socket::IPAddress.parse("tcp://127.0.0.1:8080") # => Socket::IPAddress.new("127.0.0.1", 8080)
Socket::IPAddress.parse("udp://[::1]:8080")     # => Socket::IPAddress.new("::1", 8080)
```

Example 4 (yaml):
```yaml
require "socket"

Socket::IPAddress.parse_v4_fields?("192.168.0.1")     # => UInt8.static_array(192, 168, 0, 1)
Socket::IPAddress.parse_v4_fields?("255.255.255.254") # => UInt8.static_array(255, 255, 255, 254)
Socket::IPAddress.parse_v4_fields?("01.2.3.4")        # => nil
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Process/Tms.html

**Contents:**
- struct Process::Tms
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

A struct representing the CPU current times of the process, in fractions of seconds.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/BroadcastBackend.html

**Contents:**
- class Log::BroadcastBackend
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Log::Backend
  - Constructor methods inherited from class Log::Backend
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

A backend that broadcast to others backends. Each of the referenced backends may have a different severity level filter.

When this backend level is set that level setting takes precedence over the severity filter of each referenced backend.

This backend is not to be used explicitly. It is used by Log::Builder configuration to allow a given source to emit to multiple backends.

Closes underlying resources used by this backend.

Writes the entry to this backend.

Closes underlying resources used by this backend.

Writes the entry to this backend.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/ENV.html

**Contents:**
- module ENV
- Overview
  - Example
- Extended Modules
- Defined in:
- Class Method Summary
- Class Method Detail

ENV is a hash-like accessor for environment variables.

NOTE All keys and values are strings. You must take care to cast other types at runtime, e.g. integer port numbers.

Retrieves the value for environment variable named key as a String.

Sets the value for environment variable named key as value.

Retrieves the value for environment variable named key as a String?.

Removes the environment variable named key.

Iterates over all KEY=VALUE pairs of environment variables, yielding both the key and value.

Retrieves a value corresponding to the given key.

Retrieves a value corresponding to the given key.

Retrieves a value corresponding to a given key.

Returns true if the environment variable named key exists and false if it doesn't.

Writes the contents of the environment to io.

Returns an array of all the environment variable names.

Returns an array of all the environment variable values.

Retrieves the value for environment variable named key as a String. Raises KeyError if the named variable does not exist.

Sets the value for environment variable named key as value. Overwrites existing environment variable if already present. Returns value if successful, otherwise raises an exception. If value is nil, the environment variable is deleted.

If key or value contains a null-byte an ArgumentError is raised.

Retrieves the value for environment variable named key as a String?. Returns nil if the named variable does not exist.

Removes the environment variable named key. Returns the previous value if the environment variable existed, otherwise returns nil.

Iterates over all KEY=VALUE pairs of environment variables, yielding both the key and value.

Retrieves a value corresponding to the given key. Return the second argument's value if the key does not exist.

Retrieves a value corresponding to the given key. Raises a KeyError exception if the key does not exist.

Retrieves a value corresponding to a given key. Return the value of the block if the key does not exist.

Returns true if the environment variable named key exists and false if it doesn't.

Writes the contents of the environment to io.

Returns an array of all the environment variable names.

Returns an array of all the environment variable values.

**Examples:**

Example 1 (markdown):
```markdown
# Set env var PORT to a default if not already set
ENV["PORT"] ||= "5000"
# Later use that env var.
puts ENV["PORT"].to_i
```

Example 2 (javascript):
```javascript
ENV.each do |key, value|
  puts "#{key} => #{value}"
end
```

Example 3 (javascript):
```javascript
ENV.has_key?("NOT_A_REAL_KEY") # => false
ENV.has_key?("PATH")           # => true
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/SystemError/ClassMethods.html

**Contents:**
- module SystemError::ClassMethods
- Defined in:
- Instance Method Summary
- Instance Method Detail

Builds an instance of the exception from an os_error value.

Builds an instance of the exception from an os_error value.

The system message corresponding to the OS error value amends the message. Additional keyword arguments are forwarded to the exception initializer .new_from_os_error.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/IO/ByteFormat/BigEndian.html

**Contents:**
- module IO::ByteFormat::BigEndian
- Extended Modules
- Defined in:
- Class Method Summary
- Class Method Detail

DEPRECATED Use .decode(int : Int8.class, io : IO) instead

DEPRECATED Use .decode(int : Int8.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt8.class, io : IO) instead

DEPRECATED Use .decode(int : UInt8.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int16.class, io : IO) instead

DEPRECATED Use .decode(int : Int16.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt16.class, io : IO) instead

DEPRECATED Use .decode(int : UInt16.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int32.class, io : IO) instead

DEPRECATED Use .decode(int : Int32.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt32.class, io : IO) instead

DEPRECATED Use .decode(int : UInt32.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int64.class, io : IO) instead

DEPRECATED Use .decode(int : Int64.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt64.class, io : IO) instead

DEPRECATED Use .decode(int : UInt64.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int128.class, io : IO) instead

DEPRECATED Use .decode(int : Int128.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt128.class, io : IO) instead

DEPRECATED Use .decode(int : UInt128.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int8.class, io : IO) instead

DEPRECATED Use .decode(int : Int8.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt8.class, io : IO) instead

DEPRECATED Use .decode(int : UInt8.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int16.class, io : IO) instead

DEPRECATED Use .decode(int : Int16.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt16.class, io : IO) instead

DEPRECATED Use .decode(int : UInt16.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int32.class, io : IO) instead

DEPRECATED Use .decode(int : Int32.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt32.class, io : IO) instead

DEPRECATED Use .decode(int : UInt32.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int64.class, io : IO) instead

DEPRECATED Use .decode(int : Int64.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt64.class, io : IO) instead

DEPRECATED Use .decode(int : UInt64.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int128.class, io : IO) instead

DEPRECATED Use .decode(int : Int128.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt128.class, io : IO) instead

DEPRECATED Use .decode(int : UInt128.class, bytes : Bytes) instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Colorize/Object.html

**Contents:**
- struct Colorize::Object(T)
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

A colorized object. Colors and text decorations can be modified.

Same as #ansi_escape but writes to a given io.

Prints the ANSI escape codes for an object.

Apply text decoration Mode::Blink.

Apply text decoration Mode::BlinkFast.

Apply text decoration Mode::Bold.

Apply text decoration Mode::Bright.

Apply text decoration Mode::Dim.

Apply text decoration Mode::DoubleUnderline.

Apply text decoration Mode::Hidden.

Inspects this object and makes the ANSI escape codes visible.

Apply text decoration Mode::Italic.

Adds mode to the text's decorations.

Apply text decoration Mode::Overline.

Apply text decoration Mode::Reverse.

Apply text decoration Mode::Strikethrough.

Surrounds io by the ANSI escape codes and lets you build colored strings:

Appends this object colored and with text decoration to io.

Enables or disables colors and text decoration on this object.

Apply text decoration Mode::Underline.

Same as #ansi_escape but writes to a given io.

Prints the ANSI escape codes for an object. Note that this has no effect on a Colorize::Object with content, only the escape codes.

Apply text decoration Mode::Blink.

Apply text decoration Mode::BlinkFast.

Apply text decoration Mode::Bold.

Apply text decoration Mode::Bright.

Apply text decoration Mode::Dim.

Apply text decoration Mode::DoubleUnderline.

Apply text decoration Mode::Hidden.

Inspects this object and makes the ANSI escape codes visible.

Apply text decoration Mode::Italic.

Adds mode to the text's decorations.

Apply text decoration Mode::Overline.

Apply text decoration Mode::Reverse.

Apply text decoration Mode::Strikethrough.

Surrounds io by the ANSI escape codes and lets you build colored strings:

Appends this object colored and with text decoration to io.

Enables or disables colors and text decoration on this object.

Apply text decoration Mode::Underline.

**Examples:**

Example 1 (javascript):
```javascript
require "colorize"

Colorize.with.red.ansi_escape        # => "\e[31m"
"hello world".green.bold.ansi_escape # => "\e[32;1m"
```

Example 2 (julia):
```julia
require "colorize"

io = IO::Memory.new

Colorize.with.red.surround(io) do
  io << "colorful"
  Colorize.with.green.bold.surround(io) do
    io << " hello "
  end
  Colorize.with.blue.surround(io) do
    io << "world"
  end
  io << " string"
end

io.to_s # returns a colorful string where "colorful" is red, "hello" green, "world" blue and " string" red again
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/JSON/ArrayConverter.html

**Contents:**
- module JSON::ArrayConverter(Converter)
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Constructor Detail
- Class Method Detail

Converter to be used with JSON::Serializable to serialize the elements of an Array(T) with the custom converter.

JSON::ArrayConverter.new should be used if the nested converter is also an instance instead of a type.

This implies that JSON::ArrayConverter(T) and JSON::ArrayConverter(T.class).new(T) perform the same serializations.

**Examples:**

Example 1 (json):
```json
require "json"

class TimestampArray
  include JSON::Serializable

  @[JSON::Field(converter: JSON::ArrayConverter(Time::EpochConverter))]
  property dates : Array(Time)
end

timestamp = TimestampArray.from_json(%({"dates":[1459859781,1567628762]}))
timestamp.dates   # => [2016-04-05 12:36:21Z, 2019-09-04 20:26:02Z]
timestamp.to_json # => %({"dates":[1459859781,1567628762]})
```

Example 2 (json):
```json
require "json"

class TimestampArray
  include JSON::Serializable

  @[JSON::Field(converter: JSON::ArrayConverter.new(Time::Format.new("%b %-d, %Y")))]
  property dates : Array(Time)
end

timestamp = TimestampArray.from_json(%({"dates":["Apr 5, 2016","Sep 4, 2019"]}))
timestamp.dates   # => [2016-04-05 00:00:00Z, 2019-09-04 00:00:00Z]
timestamp.to_json # => %({"dates":["Apr 5, 2016","Sep 4, 2019"]})
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM.html

**Contents:**
- module LLVM
- Defined in:
- Constant Summary
- Class Method Summary
- Class Method Detail

DEPRECATED This method has no effect

DEPRECATED This method has no effect

Returns the runtime version of LLVM.

DEPRECATED This method has no effect

DEPRECATED This method has no effect

Returns the runtime version of LLVM.

Starting with LLVM 16, this method returns the version as reported by LLVMGetVersion at runtime. Older versions of LLVM do not expose this information, so the value falls back to LibLLVM::VERSION which is determined at compile time and might slightly be out of sync to the dynamic library loaded at runtime.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Atomic/Ordering.html

**Contents:**
- enum Atomic::Ordering
- Overview
- Defined in:
- Enum Members
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum
  - Instance methods inherited from module Comparable(Enum)

Specifies how memory accesses, including non atomic, are to be reordered around atomics. Follows the C/C++ semantics: https://en.cppreference.com/w/c/atomic/memory_order.

By default atomics use the sequentially consistent ordering, which has the strongest guarantees. If all you need is to increment a counter, a relaxed ordering may be enough. If you need to synchronize access to other memory (e.g. locks) you may try the acquire/release semantics that may be faster on some architectures (e.g. X86) but remember that an acquire must be paired with a release for the ordering to be guaranteed.

The code generation always enforces the selected memory order, even on weak CPU architectures (e.g. ARM32), with the exception of the Relaxed memory order where only the operation itself is atomic.

Returns true if this enum value equals Acquire

Returns true if this enum value equals AcquireRelease

Returns true if this enum value equals Relaxed

Returns true if this enum value equals Release

Returns true if this enum value equals SequentiallyConsistent

Returns true if this enum value equals Acquire

Returns true if this enum value equals AcquireRelease

Returns true if this enum value equals Relaxed

Returns true if this enum value equals Release

Returns true if this enum value equals SequentiallyConsistent

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/Severity.html

**Contents:**
- enum Log::Severity
- Overview
- Defined in:
- Enum Members
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum
  - Instance methods inherited from module Comparable(Enum)

A logging severity level.

Used for tracing the code and trying to find one part of a function specifically.

Used for information that is diagnostically helpful to people more than just developers (IT, sysadmins, etc.).

Used for generally useful information to log.

Used for normal but significant conditions.

Used for conditions that can potentially cause application oddities, but that can be automatically recovered.

Used for any error that is fatal to the operation, but not to the service or application.

Used for any error that is forcing a shutdown of the service or application

Used only for severity level filter.

Returns true if this enum value equals Debug

Returns true if this enum value equals Error

Returns true if this enum value equals Fatal

Returns true if this enum value equals Info

Returns true if this enum value equals None

Returns true if this enum value equals Notice

Returns true if this enum value equals Trace

Returns true if this enum value equals Warn

Returns true if this enum value equals Debug

Returns true if this enum value equals Error

Returns true if this enum value equals Fatal

Returns true if this enum value equals Info

Returns true if this enum value equals None

Returns true if this enum value equals Notice

Returns true if this enum value equals Trace

Returns true if this enum value equals Warn

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Fiber/ExecutionContext/SingleThreaded.html

**Contents:**
- alias Fiber::ExecutionContext::SingleThreaded
- Overview
- Alias Definition
- Defined in:

DEPRECATED Use Fiber::ExecutionContext::Concurrent instead.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/Format/YAML_DATE.html

**Contents:**
- module Time::Format::YAML_DATE
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

Even though the standard library has Time parsers given a fixed format, the format in YAML, http://yaml.org/type/timestamp.html, can consist of just the date part, and following it any number of spaces, or 't', or 'T' can follow, with many optional components. So, we implement this in a more efficient way to avoid parsing the same string with many possible formats (there's also no way to specify an "or" like in a Regex).

As an additional note, Ruby's Psych YAML parser also implements a custom time parser, probably for this same reason.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Enum.html

**Contents:**
- abstract struct Enum
- Overview
  - Flags enum
  - Enums from integers
  - Question methods
  - Changing the Base Type
- Included Modules
- Defined in:
- Constructors
- Class Method Summary

Enum is the base type of all enums.

An enum is a set of integer values, where each value has an associated name. For example:

Values start with the value 0 and are incremented by one, but can be overwritten.

To get the underlying value you invoke value on it:

Each constant (member) in the enum has the type of the enum:

An enum can be marked with the @[Flags] annotation. This changes the default values:

Additionally, some methods change their behaviour.

An enum can be created from an integer:

Values that don't correspond to enum's constants are allowed: the value will still be of type Color, but when printed you will get the underlying value:

This method is mainly intended to convert integers from C to enums in Crystal.

An enum automatically defines question methods for each member, using String#underscore for the method name.

This is very convenient in case expressions:

The type of the underlying enum value is Int32 by default, but it can be changed to any type in Int::Primitive.

Returns the enum member that has the given value, or raises if no such member exists.

Reads a serialized enum member by name from ctx and node.

Reads a serialized enum member by name from pull.

Returns the enum member that has the given name, or raises ArgumentError if no such member exists.

Iterates each member of the enum.

Returns the enum member that has the given value, or nil if no such member exists.

Returns all enum members as an Array(String).

Returns the enum member that has the given name, or nil if no such member exists.

Returns true if the given value is an enum member, otherwise false.

Returns all enum members as an Array(self).

Convenience macro to create a combined enum (combines given members using #| (or) logical operator).

Convenience macro to create a combined enum (combines given members using #| (or) logical operator)

Returns the enum member that results from applying a logical "and" operation between this enum member's value and other.

Returns the enum member that results from adding other to this enum member's value.

Returns the enum member that results from subtracting other to this enum member's value.

Compares this enum member against another, according to their underlying value.

Returns true if this enum member and other have the same underlying value.

Returns the enum member that results from applying a logical "xor" operation between this enum member's value and other.

Returns the enum member that results from applying a logical "or" operation between this enum member's value and other.

Returns the enum member that results from applying a logical "not" operation of this enum member's value.

Iterates each values in a Flags Enum.

See Object#hash(hasher)

Returns true if this enum member's value includes other.

Returns an unambiguous String representation of this enum member.

Returns the value of this enum member as a Float32

Returns the value of this enum member as a Float32

Returns the value of this enum member as a Float64

Returns the value of this enum member as a Float64

Returns the value of this enum member as an Int32.

Returns the value of this enum member as a Int128

Returns the value of this enum member as a Int128

Returns the value of this enum member as a Int16

Returns the value of this enum member as a Int16

Returns the value of this enum member as a Int32

Returns the value of this enum member as a Int32

Returns the value of this enum member as a Int64

Returns the value of this enum member as a Int64

Returns the value of this enum member as a Int8

Returns the value of this enum member as a Int8

Serializes this enum member by name.

Appends a String representation of this enum member to the given io.

Returns a String representation of this enum member.

Returns the value of this enum member as a UInt128

Returns the value of this enum member as a UInt128

Returns the value of this enum member as a UInt16

Returns the value of this enum member as a UInt16

Returns the value of this enum member as a UInt32

Returns the value of this enum member as a UInt32

Returns the value of this enum member as a UInt64

Returns the value of this enum member as a UInt64

Returns the value of this enum member as a UInt8

Returns the value of this enum member as a UInt8

Serializes this enum member by name.

Returns the underlying value held by the enum instance.

Returns the enum member that has the given value, or raises if no such member exists.

Reads a serialized enum member by name from ctx and node.

See #to_yaml for reference.

Raises YAML::ParseException if the deserialization fails.

Reads a serialized enum member by name from pull.

See #to_json for reference.

Raises JSON::ParseException if the deserialization fails.

Returns the enum member that has the given name, or raises ArgumentError if no such member exists. The comparison is made by using String#camelcase and String#downcase between string and the enum members names. Dashes (#-) in string have the same meaning as an underscore (_). A member named "FortyTwo" or "FORTY_TWO" is found with any of these strings: "forty_two", "FortyTwo", "FORTY_TWO", "Forty-Two", "FORTYTWO", "fortytwo".

Iterates each member of the enum. It won't iterate the None and All members of flags enums.

Returns the enum member that has the given value, or nil if no such member exists.

Returns all enum members as an Array(String).

Returns the enum member that has the given name, or nil if no such member exists. The comparison is made by using String#camelcase and String#downcase between string and the enum members names. Dashes (#-) in string have the same meaning as an underscore (_). A member named "FortyTwo", or "FORTY_TWO" is found with any of these strings: "forty_two", "FortyTwo", "FORTY_TWO", "Forty-Two", "FORTYTWO", "fortytwo".

If multiple members match the same normalized string, the first one is returned.

Returns true if the given value is an enum member, otherwise false. false if not member.

NOTE This is a class method, not an instance method because an instance method .valid? is defined by the language when a user defines an enum member named Valid.

Returns all enum members as an Array(self).

Convenience macro to create a combined enum (combines given members using #| (or) logical operator).

Arguments can be the name of a member, a symbol representing a member name or a numerical value.

Convenience macro to create a combined enum (combines given members using #| (or) logical operator)

Returns the enum member that results from applying a logical "and" operation between this enum member's value and other. This is mostly useful with flag enums.

Returns the enum member that results from adding other to this enum member's value.

Returns the enum member that results from subtracting other to this enum member's value.

Compares this enum member against another, according to their underlying value.

Returns true if this enum member and other have the same underlying value.

Returns the enum member that results from applying a logical "xor" operation between this enum member's value and other. This is mostly useful with flag enums.

Returns the enum member that results from applying a logical "or" operation between this enum member's value and other. This is mostly useful with flag enums.

Returns the enum member that results from applying a logical "not" operation of this enum member's value.

Iterates each values in a Flags Enum.

See Object#hash(hasher)

Returns true if this enum member's value includes other. This performs a logical "and" between this enum member's value and other's.

This is mostly useful for flag enums.

Returns an unambiguous String representation of this enum member. In the case of a single member value, this is the fully qualified name of the member (equivalent to #to_s with the enum name as prefix). In the case of multiple members (for a flags enum), it's a call to Enum.[] for recreating the same value.

If the value can't be represented fully by named members, the remaining value is appended.

Returns the value of this enum member as a Float32

Returns the value of this enum member as a Float32

Returns the value of this enum member as a Float64

Returns the value of this enum member as a Float64

Returns the value of this enum member as an Int32.

Returns the value of this enum member as a Int128

Returns the value of this enum member as a Int128

Returns the value of this enum member as a Int16

Returns the value of this enum member as a Int16

Returns the value of this enum member as a Int32

Returns the value of this enum member as a Int32

Returns the value of this enum member as a Int64

Returns the value of this enum member as a Int64

Returns the value of this enum member as a Int8

Returns the value of this enum member as a Int8

Serializes this enum member by name.

For non-flags enums, the serialization is a JSON string. The value is the member name (see #to_s) transformed with String#underscore.

For flags enums, the serialization is a JSON array including every flagged member individually serialized in the same way as a member of a non-flags enum. None is serialized as an empty array, All as an array containing all members.

ValueConverter.to_json offers a different serialization strategy based on the member value.

Appends a String representation of this enum member to the given io.

Returns a String representation of this enum member. In the case of regular enums, this is just the name of the member. In the case of flag enums, it's the names joined by vertical bars, or "None", if the value is zero.

If an enum's value doesn't match a member's value, the raw value is returned as a string.

Returns the value of this enum member as a UInt128

Returns the value of this enum member as a UInt128

Returns the value of this enum member as a UInt16

Returns the value of this enum member as a UInt16

Returns the value of this enum member as a UInt32

Returns the value of this enum member as a UInt32

Returns the value of this enum member as a UInt64

Returns the value of this enum member as a UInt64

Returns the value of this enum member as a UInt8

Returns the value of this enum member as a UInt8

Serializes this enum member by name.

For non-flags enums, the serialization is a YAML string. The value is the member name (see #to_s) transformed with String#underscore.

For flags enums, the serialization is a YAML sequence including every flagged member individually serialized in the same way as a member of a non-flags enum. None is serialized as an empty sequence, All as a sequence containing all members.

ValueConverter.to_yaml offers a different serialization strategy based on the member value.

Returns the underlying value held by the enum instance.

**Examples:**

Example 1 (julia):
```julia
enum Color
  Red   # 0
  Green # 1
  Blue  # 2
end
```

Example 2 (yaml):
```yaml
Color::Green.value # => 1
```

Example 3 (javascript):
```javascript
typeof(Color::Red) # => Color
```

Example 4 (julia):
```julia
@[Flags]
enum IOMode
  Read  # 1
  Write # 2
  Async # 4
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/CSV/Row.html

**Contents:**
- struct CSV::Row
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

A Row of a CSV::WithHeaders instance.

Returns the current row's value corresponding to the given header name.

Returns this row's value at the given column index.

Returns this row's value corresponding to the given header_pattern.

Returns this row's value corresponding to the given header name.

Returns this row's value at the given column index.

Returns this row's value corresponding to the given header_pattern.

Returns the number of columns in this row, regardless of the number of headers (if requested).

Converts this row to an Array.

Converts this row to a Hash.

Returns a tuple of this row's values at given indices A negative index counts from the end.

Returns a tuple of this row's values corresponding to the given headers Raises KeyError if any header doesn't exist.

Returns the current row's value corresponding to the given header name. Raises KeyError if no such header exists. Raises CSV::Error if headers were not requested.

Returns this row's value at the given column index. A negative index counts from the end. Raises IndexError if no such column exists.

Returns this row's value corresponding to the given header_pattern. Raises KeyError if no such header exists. Raises CSV::Error if headers were not requested.

Returns this row's value corresponding to the given header name. Returns nil if no such header exists. Raises CSV::Error if headers were not requested.

Returns this row's value at the given column index. A negative index counts from the end. Returns nil if no such column exists.

Returns this row's value corresponding to the given header_pattern. Returns nil if no such header exists. Raises CSV::Error if headers were not requested.

Returns the number of columns in this row, regardless of the number of headers (if requested).

Converts this row to an Array.

Converts this row to a Hash.

Returns a tuple of this row's values at given indices A negative index counts from the end. Raises IndexError if any column doesn't exist The behavior of returning a tuple is similar to Hash#values_at

Returns a tuple of this row's values corresponding to the given headers Raises KeyError if any header doesn't exist. Raises CSV::Error if headers were not requested The behavior of returning a tuple is similar to Hash#values_at

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/Configuration.html

**Contents:**
- module Log::Configuration
- Overview
- Direct including types
- Defined in:
- Instance Method Summary
- Instance Method Detail

Used in Log.setup methods to configure the binding to be used.

Binds a source pattern to a backend for all logs that are of severity equal or higher to level.

Binds a source pattern to a backend for all logs that are of severity equal or higher to level.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI/X86.html

**Contents:**
- class LLVM::ABI::X86
- Overview
- Direct Known Subclasses
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class LLVM::ABI
  - Constructor methods inherited from class LLVM::ABI
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Based on https://github.com/rust-lang/rust/blob/29ac04402d53d358a1f6200bea45a301ff05b2d1/src/librustc_trans/trans/cabi_x86.rs

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Fiber/ExecutionContext/Concurrent.html

**Contents:**
- class Fiber::ExecutionContext::Concurrent
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Fiber::ExecutionContext::Parallel
  - Constructor methods inherited from class Fiber::ExecutionContext::Parallel
  - Instance methods inherited from module Fiber::ExecutionContext
  - Constructor methods inherited from module Fiber::ExecutionContext
  - Class methods inherited from module Fiber::ExecutionContext

Concurrent-only execution context.

Fibers running in the same context can only run concurrently and never in parallel to each others. However, they still run in parallel to fibers running in other execution contexts.

Fibers in this context can use simpler and faster synchronization primitives between themselves (for example no atomics or thread safety required), but data shared with other contexts needs to be protected (e.g. Mutex), and communication with fibers in other contexts requires safe primitives, for example Channel.

A blocking fiber blocks the entire context, and thus all the other fibers in the context.

For example: we can start a concurrent context to run consumer fibers, while the default context produces values. Because the consumer fibers will never run in parallel and don't yield between reading result then writing it, we are not required to synchronize accesses to the value:

In practice, we still recommended to always protect shared accesses to a variable, for example using Atomic#add to increment result or a Mutex for more complex operations.

Creates a Concurrent context.

Always raises an ArgumentError exception because a concurrent context cannot be resized.

Creates a Concurrent context. The context will only really start when a fiber is spawned into it.

Always raises an ArgumentError exception because a concurrent context cannot be resized.

**Examples:**

Example 1 (typescript):
```typescript
require "wait_group"

consumers = Fiber::ExecutionContext::Concurrent.new("consumers")
channel = Channel(Int32).new(64)
wg = WaitGroup.new(32)

result = 0

32.times do
  consumers.spawn do
    while value = channel.receive?
      # safe, but only for this example:
      result = result + value
    end
  ensure
    wg.done
  end
end

1024.times { |i| channel.send(i) }
channel.close

# wait for all workers to be done
wg.wait

p result # => 523776
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Spec/Methods.html

**Contents:**
- module Spec::Methods
- Defined in:
- Macro Summary
- Instance Method Summary
- Macro Detail
- Instance Method Detail

Calls method expecting an iterator and compares iterated values with expected.

Calls method with a block and compares yielded values with expected.

Asserts that the given call and its IO-accepting variant both match the given expectation, used to test string printing.

Asserts that the given call and its IO-accepting variant both produce the given string str.

Spec helper for generic iteration methods which tests both yielding and iterator overloads.

Executes the given block after the last spec in the current context runs.

Executes the given block after each spec in the current context runs.

Executes the given block when the current context runs.

Executes the given block when each spec in the current context runs.

Executes the given block before the first spec in the current context runs.

Executes the given block before each spec in the current context runs.

Defines an example group that establishes a specific context, like empty array versus array with elements.

Defines an example group that describes a unit to be tested.

Defines a concrete test case.

Defines a pending test case.

Defines a yet-to-be-implemented pending test case

Marks the current example pending

Calls method expecting an iterator and compares iterated values with expected.

See .it_iterates for details.

Calls method with a block and compares yielded values with expected.

See .it_iterates for details.

Asserts that the given call and its IO-accepting variant both match the given expectation, used to test string printing.

Given a call of the form foo.bar(*args, **opts), this tests the following cases:

The overload that accepts a str argument is usually easier to work with.

Asserts that the given call and its IO-accepting variant both produce the given string str.

Equivalent to assert_prints call, should: eq(str). str must be validly encoded in UTF-8.

Methods that do not follow the convention of IO-accepting and String-returning overloads can also be tested as long as suitable wrapper methods are defined:

Spec helper for generic iteration methods which tests both yielding and iterator overloads.

This helper creates two spec examples named description with suffixes " yielding" and " iterator". The yielding example calls method with a block and expects the iteration elements to be yielded to the block. The iterator example calls method without a block and expects it to return an Iterator which it then consumes.

The iterated elements are collected in an array and compared to expected, ensuring type-equality of the elements.

By default, both examples make sure that the iteration is finished after iterating all elements from expected. If the iteration is infinite, passing infinite: true skips that check and allows to test a finite sample of an infinite iteration.

If the iteration elements are tuples (i.e. multiple values), the yielding variant by default only catches the first value because of the block argument mechanics. Passing tuple: true ensures all yielded arguments are collected using a splat.

Executes the given block after the last spec in the current context runs.

A context is defined by #describe or #context blocks, or outside of them it's the root context. This is independent of the source location the specs and this hook are defined.

If multiple blocks are registered on the same context, they are executed in order of definition.

Executes the given block after each spec in the current context runs.

A context is defined by #describe or #context blocks, or outside of them it's the root context. Nested contexts inherit the *_each blocks of their ancestors.

If multiple blocks are registered for the same spec, the blocks defined in the outermost context go first. Blocks on the same context are executed in order of definition.

Executes the given block when the current context runs.

The block must call run on the given Context::Procsy object.

This is essentially a #before_all and #after_all hook combined into one. It is useful for example when setup and teardown steps need shared state.

A context is defined by #describe or #context blocks. This hook does not work outside such a block (i.e. in the root context).

If multiple blocks are registered for the same spec, the blocks defined in the outermost context go first. Blocks on the same context are executed in order of definition.

Executes the given block when each spec in the current context runs.

The block must call run on the given Example::Procsy object.

This is essentially a #before_each and #after_each hook combined into one. It is useful for example when setup and teardown steps need shared state.

A context is defined by #describe or #context blocks, or outside of them it's the root context. Nested contexts inherit the *_each blocks of their ancestors.

If multiple blocks are registered for the same spec, the blocks defined in the outermost context go first. Blocks on the same context are executed in order of definition.

Executes the given block before the first spec in the current context runs.

A context is defined by #describe or #context blocks, or outside of them it's the root context. This is independent of the source location the specs and this hook are defined.

If multiple blocks are registered on the same context, they are executed in order of definition.

Executes the given block before each spec in the current context runs.

A context is defined by #describe or #context blocks, or outside of them it's the root context. Nested contexts inherit the *_each blocks of their ancestors.

If multiple blocks are registered for the same spec, the blocks defined in the outermost context go first. Blocks on the same context are executed in order of definition.

Defines an example group that establishes a specific context, like empty array versus array with elements. Inside &block examples are defined by #it or #pending.

It is functionally equivalent to #describe.

If focus is true, only this #context, and others marked with focus: true, will run.

Defines an example group that describes a unit to be tested. Inside &block examples are defined by #it or #pending.

Several #describe blocks can be nested.

If focus is true, only this #describe, and others marked with focus: true, will run.

This method can be used to manually fail an example defined in an #it block.

Defines a concrete test case.

The test is performed by the block supplied to &block.

It is usually used inside a #describe or #context section.

If focus is true, only this test, and others marked with focus: true, will run.

Defines a pending test case.

&block is never evaluated. It can be used to describe behaviour that is not yet implemented.

It is usually used inside a #describe or #context section.

If focus is true, only this test, and others marked with focus: true, will run.

Defines a yet-to-be-implemented pending test case

If focus is true, only this test, and others marked with focus: true, will run.

Marks the current example pending

In case an example needs to be pending on some condition that requires executing it, this allows to mark it as such rather than letting it fail or never run.

**Examples:**

Example 1 (julia):
```julia
require "spec"
require "spec/helpers/string"

it "prints integers with `Int#to_s`" do
  assert_prints 123.to_s, "123"
  assert_prints 123.to_s(16), "7b"
end
```

Example 2 (python):
```python
require "spec"
require "spec/helpers/string"

private def fprintf(format, *args)
  sprintf(format, *args)
end

private def fprintf(io : IO, format, *args)
  io.printf(format, *args)
end

it "prints with `sprintf` and `IO#printf`" do
  assert_prints fprintf("%d", 123), "123"
  assert_prints fprintf("%x %b", 123, 6), "7b 110"
end
```

Example 3 (unknown):
```unknown
require "spec/helpers/iterate"

it_iterates "Array#each", [1, 2, 3], (1..3).each
it_iterates "infinite #cycle", [1, 2, 3, 1, 2, 3, 1], (1..3).cycle, infinite: true
```

Example 4 (unknown):
```unknown
require "spec/helpers/iterate"

it_iterates "Array#each_with_index", [{1, 0}, {2, 1}, {3, 2}], (1..3).each_with_index, tuple: true
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Digest/SHA256.html

**Contents:**
- class Digest::SHA256
- Overview
- Extended Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class OpenSSL::Digest
  - Constructor methods inherited from class OpenSSL::Digest
  - Instance methods inherited from class Digest
  - Instance methods inherited from class Reference

Implements the SHA256 digest algorithm.

NOTE To use SHA256, you must explicitly import it with require "digest/sha256"

Returns a shallow copy of this object.

Returns a shallow copy of this object.

This allocates a new object and copies the contents of self into it.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/UNIXServer.html

**Contents:**
- class UNIXServer
- Overview
- Included Modules
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Socket::Server
  - Instance methods inherited from class UNIXSocket
  - Constructor methods inherited from class UNIXSocket

A local interprocess communication server socket.

Available on UNIX-like operating systems, and Windows 10 Build 17063 or above. Not all features are supported on Windows.

NOTE To use UNIXServer, you must explicitly import it with require "socket"

Creates a named UNIX socket, listening on a filesystem pathname.

Creates a UNIXServer from an existing system file descriptor or socket handle.

Creates a new UNIX server and yields it to the block.

Accepts an incoming connection.

Closes the socket, then deletes the filesystem pathname if it exists.

Creates a named UNIX socket, listening on a filesystem pathname.

Always deletes any existing filesystem pathname first, in order to cleanup any leftover socket file.

The server is of stream type by default, but this can be changed for another type. For example datagram messages:

Only the stream type is supported on Windows.

Creates a UNIXServer from an existing system file descriptor or socket handle.

This adopts fd into the IO system that will reconfigure it as per the event loop runtime requirements.

NOTE On Windows, the handle must have been created with WSA_FLAG_OVERLAPPED.

Creates a new UNIX server and yields it to the block. Eventually closes the server socket when the block returns.

Returns the value of the block.

Accepts an incoming connection.

Returns the client socket or nil if the server is closed after invoking this method.

Closes the socket, then deletes the filesystem pathname if it exists.

**Examples:**

Example 1 (python):
```python
require "socket"

def handle_client(client)
  message = client.gets
  client.puts message
end

server = UNIXServer.new("/tmp/myapp.sock")
while client = server.accept?
  spawn handle_client(client)
end
```

Example 2 (julia):
```julia
UNIXServer.new("/tmp/dgram.sock", Socket::Type::DGRAM)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ModulePassManager.html

**Contents:**
- class LLVM::ModulePassManager
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

DEPRECATED The legacy pass manager was removed in LLVM 17. Use LLVM::PassBuilderOptions instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/URI/Punycode.html

**Contents:**
- class URI::Punycode
- Overview
- Defined in:
- Class Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Punycode provides an interface for IDNA encoding (RFC 5980), defined in RFC 3492.

Implementation based on Mathias Bynens' punnycode.js project.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/String/Grapheme.html

**Contents:**
- struct String::Grapheme
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Grapheme represents a Unicode grapheme cluster, which describes the smallest functional unit of a writing system. This is also called a user-perceived character.

In the latin alphabet, most graphemes consist of a single Unicode codepoint (equivalent to Char). But a grapheme can also consist of a sequence of codepoints, which combine into a single unit.

For example, the string "e\u0301" consists of two characters, the latin small letter e and the combining acute accent ´. Together, they form a single grapheme: é. That same grapheme could alternatively be described in a single codepoint, \u00E9 (latin small letter e with acute). But the combinatory possibilities are far bigger than the amount of directly available codepoints.

This combination of codepoints is common in some non-latin scripts. It's also often used with emojis to create customized combination. For example, the thumbs up sign 👍 (U+1F44D) combined with an emoji modifier such as U+1F3FC assign a colour to the emoji.

Instances of this type can be acquired via String#each_grapheme or String#graphemes.

The algorithm to determine boundaries between grapheme clusters is specified in the Unicode Standard Annex #29.

EXPERIMENTAL The grapheme API is still under development. Join the discussion at #11610.

Returns true if other is equivalent to self.

Returns the number of bytes in the UTF-8 representation of this grapheme cluster.

Appends a representation of this grapheme cluster to io.

Returns the number of characters in this grapheme cluster.

Appends the characters in this grapheme cluster to io.

Returns the characters in this grapheme cluster.

Returns true if other is equivalent to self.

Two graphemes are considered equivalent if they contain the same sequence of codepoints.

Returns the number of bytes in the UTF-8 representation of this grapheme cluster.

Appends a representation of this grapheme cluster to io.

Returns the number of characters in this grapheme cluster.

Appends the characters in this grapheme cluster to io.

Returns the characters in this grapheme cluster.

**Examples:**

Example 1 (javascript):
```javascript
"e\u0301".size # => 2
"é".size       # => 1

"e\u0301".grapheme_size # => 1
"é".grapheme_size       # => 1
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Iterator/Stop.html

**Contents:**
- class Iterator::Stop
- Overview
- Defined in:
- Constant Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

The class that signals that there are no more elements in an Iterator.

---

## Crystal

**URL:** https://crystal-lang.org/

**Contents:**
- News
- Top Sponsors
- Success stories

Beta is stepping down from the lead position, which Johannes will take

The team behind the language, on your team

With great pleasure we announce that Margret Riegert (nobodywasishere) has joined the Crystal Core Team.

Recap of two days reflecting and sharing experiences on Crystal

Become a Crystal sponsor in only 3 simple steps via OpenCollective

Sponsoring Crystal creates a great springboard for your brand

You can tap into the expertise of the very creators of the language to guide you in your implementation.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/MemoryBackend.html

**Contents:**
- class Log::MemoryBackend
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Log::Backend
  - Constructor methods inherited from class Log::Backend
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

A Log::Backend suitable for testing.

Writes the entry to this backend.

Writes the entry to this backend.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Steppable.html

**Contents:**
- module Steppable
- Overview
- Direct including types
- Defined in:
- Instance Method Summary
- Instance Method Detail

Implements a #step method for iterating from a value.

Iterates from self to limit incrementing by the amount of step on each iteration.

Iterates from self to limit incrementing by the amount of step on each iteration.

Iterates from self to limit incrementing by the amount of step on each iteration. If exclusive is true, limit is excluded from the iteration.

The type of each iterated element is typeof(self + step).

If to is nil, iteration is open ended.

The starting point (self) is always iterated as first element, with two exceptions:

In those cases the iteration is empty.

Iterates from self to limit incrementing by the amount of step on each iteration. If exclusive is true, limit is excluded from the iteration.

The type of each iterated element is typeof(self + step).

If to is nil, iteration is open ended.

The starting point (self) is always iterated as first element, with two exceptions:

In those cases the iteration is empty.

**Examples:**

Example 1 (javascript):
```javascript
ary = [] of Int32
1.step(to: 4, by: 2) do |x|
  ary << x
end
ary                                        # => [1, 3]
1.step(to: 4, by: 2).to_a                  # => [1, 3]
1.step(to: 4, by: 1).to_a                  # => [1, 2, 3, 4]
1.step(to: 4, by: 1, exclusive: true).to_a # => [1, 2, 3]
```

Example 2 (javascript):
```javascript
ary = [] of Int32
1.step(to: 4, by: 2) do |x|
  ary << x
end
ary                                        # => [1, 3]
1.step(to: 4, by: 2).to_a                  # => [1, 3]
1.step(to: 4, by: 1).to_a                  # => [1, 2, 3, 4]
1.step(to: 4, by: 1, exclusive: true).to_a # => [1, 2, 3]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/FormData/FileMetadata.html

**Contents:**
- struct HTTP::FormData::FileMetadata
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Metadata which may be available for uploaded files.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/StaticFileHandler.html

**Contents:**
- class HTTP::StaticFileHandler
- Overview
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module HTTP::Handler
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

A handler that lists directories and serves files under a given public directory.

This handler can send precompressed content, if the client accepts it, and a file with the same name and .gz extension appended is found in the same directory. Precompressed files are only served if they are newer than the original file.

NOTE To use StaticFileHandler, you must explicitly import it with require "http"

Creates a handler that will serve files in the given public_dir, after expanding it (using File#expand_path).

Creates a handler that will serve files in the given public_dir, after expanding it (using File#expand_path).

Creates a handler that will serve files in the given public_dir, after expanding it (using File#expand_path).

If fallthrough is false, this handler does not call next handler when request method is neither GET or HEAD, then serves 405 Method Not Allowed. Otherwise, it calls next handler.

If directory_listing is false, directory listing is disabled. This means that paths matching directories are ignored and next handler is called.

Creates a handler that will serve files in the given public_dir, after expanding it (using File#expand_path).

If fallthrough is false, this handler does not call next handler when request method is neither GET or HEAD, then serves 405 Method Not Allowed. Otherwise, it calls next handler.

If directory_listing is false, directory listing is disabled. This means that paths matching directories are ignored and next handler is called.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/BigDecimal.html

**Contents:**
- struct BigDecimal
- Overview
- Included Modules
- Defined in:
- Constant Summary
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Comparable(BigDecimal)
  - Instance methods inherited from module Comparable(BigRational)

A BigDecimal can represent arbitrarily large precision decimals.

It is internally represented by a pair of BigInt and UInt64: value and scale. Value contains the actual value, and scale tells the decimal point place. E.g. when value is 1234 and scale 2, the result is 12.34.

NOTE To use BigDecimal, you must explicitly import it with require "big"

The general idea and some of the arithmetic algorithms were adapted from the MIT/APACHE-licensed bigdecimal-rs.

DEPRECATED Use DEFAULT_PRECISION instead

Creates a new BigDecimal from BigInt value and UInt64 scale, which matches the internal representation.

Creates a new BigDecimal from Float.

Creates a new BigDecimal from BigRational.

Creates a new BigDecimal from Int.

Creates a new BigDecimal from a String.

Raises the decimal to the otherth power

The comparison operator.

Compares this object to other based on the receiver’s <=> method, returning true if it returns 0.

Rounds towards positive infinity.

Divides self with another BigDecimal, with an optionally configurable precision.

Divides self with another BigDecimal, with an optionally configurable precision.

DEPRECATED Use #div(other : BigDecimal, precision = DEFAULT_PRECISION) instead

Rounds towards negative infinity.

Prints this number as a String using a customizable format.

Returns true if self is an integer.

Returns the quotient as absolutely negative if self and other have different signs, otherwise returns the quotient.

Rounds this number to a given precision.

Rounds towards the nearest integer.

Rounds towards the nearest integer.

Scales a BigDecimal to another BigDecimal, so they can be computed easier.

Converts to BigFloat.

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

Returns true if self is equal to zero.

Creates a new BigDecimal from BigInt value and UInt64 scale, which matches the internal representation.

Creates a new BigDecimal from Float.

NOTE Floats are fundamentally less precise than BigDecimals, which makes initialization from them risky.

Creates a new BigDecimal from BigRational.

NOTE BigRational are fundamentally more precise than BigDecimals, which makes initialization from them risky.

Returns num. Useful for generic code that does T.new(...) with T being a Number.

Creates a new BigDecimal from Int.

Creates a new BigDecimal from a String.

Allows only valid number strings with an optional negative sign.

Raises the decimal to the otherth power

The comparison operator. Returns 0 if the two objects are equal, a negative number if this object is considered less than other, a positive number if this object is considered greater than other, or nil if the two objects are not comparable.

Subclasses define this method to provide class-specific ordering.

The comparison operator is usually used to sort values:

Compares this object to other based on the receiver’s <=> method, returning true if it returns 0.

Also returns true if this and other are the same object.

Rounds towards positive infinity.

Divides self with another BigDecimal, with an optionally configurable precision.

When the division is inexact, the returned value rounds towards negative infinity, and its scale is never greater than scale - other.scale + precision.

Divides self with another BigDecimal, with an optionally configurable precision.

When the division is inexact, the returned value rounds towards negative infinity, and its scale is never greater than scale - other.scale + precision.

DEPRECATED Use #div(other : BigDecimal, precision = DEFAULT_PRECISION) instead

Rounds towards negative infinity.

Prints this number as a String using a customizable format.

separator is used as decimal separator, delimiter as thousands delimiter between batches of group digits.

If decimal_places is nil, all significant decimal places are printed (similar to #to_s). If the argument has a numeric value, the number of visible decimal places will be fixed to that amount.

Trailing zeros are omitted if only_significant is true.

Returns true if self is an integer.

Non-integer types may return true as long as self denotes a finite value without any fractional parts.

Returns the quotient as absolutely negative if self and other have different signs, otherwise returns the quotient.

Rounds this number to a given precision.

Rounds to the specified number of digits after the decimal place, (or before if negative), in base base.

The rounding mode controls the direction of the rounding. The default is RoundingMode::TIES_EVEN which rounds to the nearest integer, with ties (fractional value of 0.5) being rounded to the even neighbor (Banker's rounding).

Rounds towards the nearest integer. If both neighboring integers are equidistant, rounds away from zero.

Rounds towards the nearest integer. If both neighboring integers are equidistant, rounds towards the even neighbor (Banker's rounding).

Scales a BigDecimal to another BigDecimal, so they can be computed easier.

Converts to BigFloat.

Converts to BigInt. Truncates anything on the right side of the decimal point.

Converts to Float64. Raises OverflowError in case of overflow.

Converts to Float64. In case of overflow a wrapping is performed.

Converts to Float32. Raises OverflowError in case of overflow.

Converts to Float32. In case of overflow a wrapping is performed.

Converts to Float64. Raises OverflowError in case of overflow.

Converts to Float64. In case of overflow a wrapping is performed.

Converts to Int32. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to Int32. Truncates anything on the right side of the decimal point. In case of overflow a wrapping is performed.

Converts to Int16. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to Int16. Truncates anything on the right side of the decimal point. In case of overflow a wrapping is performed.

Converts to Int32. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to Int32. Truncates anything on the right side of the decimal point. In case of overflow a wrapping is performed.

Converts to Int64. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to Int64. Truncates anything on the right side of the decimal point. In case of overflow a wrapping is performed.

Converts to Int8. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to Int8. Truncates anything on the right side of the decimal point. In case of overflow a wrapping is performed.

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

This method is called when an object is interpolated in a string literal:

IO#<< calls this method to append an object to itself:

Thus implementations must not interpolate self in a string literal or call io << self which both would lead to an endless loop.

Also see #inspect(IO).

Converts to UInt32. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to UInt32. Truncates anything on the right side of the decimal point, converting negative to positive. In case of overflow a wrapping is performed.

Converts to UInt16. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to UInt16. Truncates anything on the right side of the decimal point, converting negative to positive. In case of overflow a wrapping is performed.

Converts to UInt32. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to UInt32. Truncates anything on the right side of the decimal point, converting negative to positive. In case of overflow a wrapping is performed.

Converts to UInt64. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to UInt64. Truncates anything on the right side of the decimal point, converting negative to positive. In case of overflow a wrapping is performed.

Converts to UInt8. Truncates anything on the right side of the decimal point. Raises OverflowError in case of overflow.

Converts to UInt8. Truncates anything on the right side of the decimal point, converting negative to positive. In case of overflow a wrapping is performed.

Returns true if self is equal to zero.

**Examples:**

Example 1 (javascript):
```javascript
require "big"

BigDecimal.new(1234, 2) ** 2 # => 152.2756
```

Example 2 (json):
```json
# Sort in a descending way:
[3, 1, 2].sort { |x, y| y <=> x } # => [3, 2, 1]

# Sort in an ascending way:
[3, 1, 2].sort { |x, y| x <=> y } # => [1, 2, 3]
```

Example 3 (javascript):
```javascript
BigDecimal.new(1).div(BigDecimal.new(2))    # => BigDecimal(@value=5, @scale=2)
BigDecimal.new(1).div(BigDecimal.new(3), 5) # => BigDecimal(@value=33333, @scale=5)
```

Example 4 (javascript):
```javascript
BigDecimal.new(1).div(BigDecimal.new(2))    # => BigDecimal(@value=5, @scale=2)
BigDecimal.new(1).div(BigDecimal.new(3), 5) # => BigDecimal(@value=33333, @scale=5)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP/LogHandler.html

**Contents:**
- class HTTP::LogHandler
- Overview
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module HTTP::Handler
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

A handler that logs the request method, resource, status code, and the time used to execute the next handler

NOTE To use LogHandler, you must explicitly import it with require "http"

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/toplevel.html

**Contents:**
- Top Level Namespace
- Included Modules
- Extended Modules
- Defined in:
- Constant Summary
- Method Summary
- Macro Summary
  - Instance methods inherited from module Spec::Methods
  - Macros inherited from module Spec::Methods
  - Instance methods inherited from module Spec::Expectations

An IO for reading files from ARGV.

A file to read from: (file)

After a file from ARGV has been read, it's removed from ARGV.

You can manipulate ARGV yourself to control what ARGF operates on. If you remove a file from ARGV, it is ignored by ARGF; if you add files to ARGV, ARGF will read from it.

An array of arguments passed to the program.

The name, the program was called with.

The result may be a relative or absolute path (including symbolic links), just the command name or the empty string.

See Process.executable_path for a more convenient alternative that always returns the absolute real path to the executable file (if it exists).

The standard error file descriptor.

Typically used to output error messages and diagnostics.

At the start of the program STDERR is configured like this:

On Unix systems, if the file descriptor is a TTY, the runtime duplicates it. So STDERR.fd might not be 2. The reason for this is to enable non-blocking writes for concurrency. Other fibers can run while waiting on IO. The original file descriptor is inherited from the parent process. Setting it to non-blocking mode would reflect back which can cause problems.

On Windows, STDERR is always blocking.

The standard input file descriptor. Contains data piped to the program.

On Unix systems, if the file descriptor is a TTY, the runtime duplicates it. So STDIN.fd might not be 0. The reason for this is to enable non-blocking reads for concurrency. Other fibers can run while waiting on user input. The original file descriptor is inherited from the parent process. Setting it to non-blocking mode would reflect back, which can cause problems.

On Windows, STDIN is always blocking.

The standard output file descriptor.

Typically used to output data and information.

At the start of the program STDOUT is configured like this:

On Unix systems, if the file descriptor is a TTY, the runtime duplicates it. So STDOUT.fd might not be 1. The reason for this is to enable non-blocking writes for concurrency. Other fibers can run while waiting on IO. The original file descriptor is inherited from the parent process. Setting it to non-blocking mode would reflect back which can cause problems.

On Windows, STDOUT is always blocking.

Returns the standard output of executing command in a subshell.

Terminates execution immediately, printing message to STDERR and then calling exit(status).

Returns the alignment of the given type as number of bytes.

Registers the given Proc for execution when the program exits regularly.

Returns the current execution stack as an array containing strings usually in the form file:line:column or file:line:column in 'method'.

Terminates execution immediately, returning the given status code to the invoking environment.

Reads a line from STDIN.

Returns the instance alignment of the given class as number of bytes.

Returns the instance size of the given class as number of bytes.

Repeatedly executes the block.

Main function that acts as C's main function.

Returns the byte offset of an instance variable in a struct or class type.

Inspects object to STDOUT followed by a newline.

Inspects each object in objects to STDOUT, followed by a newline.

Inspects objects to STDOUT, followed by a newline.

Returns a Pointer to the contents of a variable.

Pretty prints object to STDOUT followed by a newline.

Pretty prints each object in objects to STDOUT, followed by a newline.

Pretty prints objects to STDOUT, followed by a newline.

Prints objects to STDOUT and then invokes STDOUT.flush.

Prints a formatted string to STDOUT.

Prints a formatted string to STDOUT.

Prints objects to STDOUT, each followed by a newline character unless the object is a String and already ends with a newline.

Raises the exception.

Raises an Exception with the message.

Reads a line from STDIN.

Returns the size of the given type as number of bytes.

Blocks the current fiber for the specified number of seconds.

DEPRECATED Use ::sleep(Time::Span) instead

Blocks the current Fiber for the specified time span.

Blocks the current fiber forever.

Returns a formatted string.

Returns a formatted string.

Executes the given command in a subshell.

Timeout keyword for use in select.

Returns the type of an expression.

Invokes an execution trap to catch the attention of a debugger.

Prints a series of expressions together with their inspected values.

Prints a series of expressions together with their pretty printed values.

Defines a Struct type called name with the given properties.

Spawns a fiber by first creating a Proc, passing the call's expressions to it, and letting the Proc finally invoke the call.

Returns the standard output of executing command in a subshell. Standard input, and error are inherited. The special $? variable is set to a Process::Status associated with this execution.

It is impossible to call this method with any regular call syntax. There is an associated literal type which calls the method with the literal content as command:

See Command literals in the language reference.

Terminates execution immediately, printing message to STDERR and then calling exit(status).

Returns the alignment of the given type as number of bytes.

type must be a constant or typeof() expression. It cannot be evaluated at runtime.

For Reference types, the alignment is the same as the alignment of a pointer:

This is because a Reference's memory is allocated on the heap and a pointer to it is passed around. The alignment of a class on the heap can be determined using #instance_alignof.

NOTE This is a pseudo-method provided directly by the Crystal compiler. It cannot be redefined nor overridden.

Registers the given Proc for execution when the program exits regularly.

A regular exit happens when either

Process.exit does not trigger at_exit handlers, nor does external process termination (see Process.on_terminate for handling that).

If multiple handlers are registered, they are executed in reverse order of registration.

The exit status code that will be returned by this program is passed to the block as its first argument. In case of any unhandled exception, it is passed as the second argument to the block, if the program terminates normally or exit(status) is called explicitly, then the second argument will be nil.

NOTE If at_exit is called inside an at_exit handler, it will be called right after the current at_exit handler ends, and then other handlers will be invoked.

Returns the current execution stack as an array containing strings usually in the form file:line:column or file:line:column in 'method'.

Terminates execution immediately, returning the given status code to the invoking environment.

Registered at_exit procs are executed.

Reads a line from STDIN.

Returns the instance alignment of the given class as number of bytes.

type must be a constant or typeof() expression. It cannot be evaluated at runtime.

See alignof for determining the size of value types.

NOTE This is a pseudo-method provided directly by the Crystal compiler. It cannot be redefined nor overridden.

Returns the instance size of the given class as number of bytes.

type must be a constant or typeof() expression. It cannot be evaluated at runtime.

See sizeof for determining the size of value types.

NOTE This is a pseudo-method provided directly by the Crystal compiler. It cannot be redefined nor overridden.

Repeatedly executes the block.

Main function that acts as C's main function. Invokes Crystal.main.

Can be redefined. See Crystal.main for examples.

On Windows the actual entry point is wmain, but there is no need to redefine that. See the file required below for details.

Returns the byte offset of an instance variable in a struct or class type.

type must be a constant or typeof() expression. It cannot be evaluated at runtime. offset must be the name of an instance variable of type, prefixed by @, or the index of an element in a Tuple, starting from 0, if type is a Tuple.

NOTE This is a pseudo-method provided directly by the Crystal compiler. It cannot be redefined nor overridden.

Inspects object to STDOUT followed by a newline. Returns object.

See also: Object#inspect(io).

Inspects each object in objects to STDOUT, followed by a newline. Returns objects.

See also: Object#inspect(io).

Inspects objects to STDOUT, followed by a newline. Returns objects.

See Object#inspect(io)

Returns a Pointer to the contents of a variable.

variable must be a variable (local, instance, class or library).

NOTE This is a pseudo-method provided directly by the Crystal compiler. It cannot be redefined nor overridden.

Pretty prints object to STDOUT followed by a newline. Returns object.

See also: Object#pretty_print(pp).

Pretty prints each object in objects to STDOUT, followed by a newline. Returns objects.

See also: Object#pretty_print(pp).

Pretty prints objects to STDOUT, followed by a newline. Returns objects.

See Object#pretty_print(pp)

Prints objects to STDOUT and then invokes STDOUT.flush.

Prints a formatted string to STDOUT.

For details on the format string, see sprintf.

Prints a formatted string to STDOUT.

For details on the format string, see sprintf.

Prints objects to STDOUT, each followed by a newline character unless the object is a String and already ends with a newline.

Raises the exception.

This will set the exception's callstack if it hasn't been already. Re-raising a previously caught exception won't replace the callstack.

Raises an Exception with the message.

Reads a line from STDIN.

See also: IO#read_line.

Returns the size of the given type as number of bytes.

type must be a constant or typeof() expression. It cannot be evaluated at runtime.

For Reference types, the size is the same as the size of a pointer:

This is because a Reference's memory is allocated on the heap and a pointer to it is passed around. The size of a class on the heap can be determined using #instance_sizeof.

NOTE This is a pseudo-method provided directly by the Crystal compiler. It cannot be redefined nor overridden.

Blocks the current fiber for the specified number of seconds.

While this fiber is waiting this time, other ready-to-execute fibers might start their execution.

DEPRECATED Use ::sleep(Time::Span) instead

Blocks the current Fiber for the specified time span.

While this fiber is waiting this time, other ready-to-execute fibers might start their execution.

Blocks the current fiber forever.

Meanwhile, other ready-to-execute fibers might start their execution.

When using execution contexts, the fiber spawns into the current execution context (Fiber::ExecutionContext.current).

NOTE The newly created fiber doesn't run as soon as spawned.

Returns a formatted string. The string is produced according to the format_string with format specifiers being replaced by values from args formatted according to the specifier.

Within the format string, any characters other than format specifiers (specifiers beginning with %) are copied to the result. The formatter supports the following kinds of format specifiers:

Mixing of different kinds of format specifiers is disallowed, except that the two named forms may be used together.

A simple format specifier consists of a percent sign, followed by optional flags, width, and precision indicators, then terminated with a field type character.

A formatted substitution is similar but after the percent sign follows the mandatory name of the substitution wrapped in angle brackets.

The percent sign itself is escaped by %%. No format modifiers are allowed, and no arguments are consumed.

The field type controls how the corresponding argument value is to be interpreted, while the flags modify that interpretation.

The field type characters are:

Flags modify the behavior of the format specifiers:

Decimal number conversion:

Octal number conversion:

Hexadecimal number conversion:

Binary number conversion:

Floating point conversion:

Exponential form conversion:

The field width is an optional integer, followed optionally by a period and a precision. The width specifies the minimum number of characters that will be written to the result for this field.

For numeric fields, the precision controls the number of decimal places displayed.

For string fields, the precision determines the maximum number of characters to be copied from the string.

Examples of precisions:

Precision for d, o, x and b is minimum number of digits:

Precision for e is number of digits after the decimal point:

Precision for f is number of digits after the decimal point:

Precision for g is number of significant digits:

Precision for s is maximum number of characters:

Returns a formatted string. The string is produced according to the format_string with format specifiers being replaced by values from args formatted according to the specifier.

Within the format string, any characters other than format specifiers (specifiers beginning with %) are copied to the result. The formatter supports the following kinds of format specifiers:

Mixing of different kinds of format specifiers is disallowed, except that the two named forms may be used together.

A simple format specifier consists of a percent sign, followed by optional flags, width, and precision indicators, then terminated with a field type character.

A formatted substitution is similar but after the percent sign follows the mandatory name of the substitution wrapped in angle brackets.

The percent sign itself is escaped by %%. No format modifiers are allowed, and no arguments are consumed.

The field type controls how the corresponding argument value is to be interpreted, while the flags modify that interpretation.

The field type characters are:

Flags modify the behavior of the format specifiers:

Decimal number conversion:

Octal number conversion:

Hexadecimal number conversion:

Binary number conversion:

Floating point conversion:

Exponential form conversion:

The field width is an optional integer, followed optionally by a period and a precision. The width specifies the minimum number of characters that will be written to the result for this field.

For numeric fields, the precision controls the number of decimal places displayed.

For string fields, the precision determines the maximum number of characters to be copied from the string.

Examples of precisions:

Precision for d, o, x and b is minimum number of digits:

Precision for e is number of digits after the decimal point:

Precision for f is number of digits after the decimal point:

Precision for g is number of significant digits:

Precision for s is maximum number of characters:

Executes the given command in a subshell. Standard input, output and error are inherited. Returns true if the command gives zero exit code, false otherwise. The special $? variable is set to a Process::Status associated with this execution.

If command contains no spaces and args is given, it will become its argument list.

If command contains spaces and args is given, command must include "${@}" (including the quotes) to receive the argument list.

No shell interpretation is done in args.

Timeout keyword for use in select.

NOTE It won't trigger if the select has an else case (i.e.: a non-blocking select).

Returns the type of an expression.

It accepts multiple arguments, and the result is the union of the expression types:

The expressions passed as arguments to typeof do not evaluate. The compiler only analyzes their return type.

NOTE This is a pseudo-method provided directly by the Crystal compiler. It cannot be redefined nor overridden.

Invokes an execution trap to catch the attention of a debugger. This has the same effect as placing a breakpoint in debuggers or IDEs supporting them.

Execution is allowed to continue if the debugger instructs so. If no debugger is attached, usually the current process terminates with a status that corresponds to Process::ExitReason::Breakpoint.

Inside an interpreter session, this drops into the REPL's pry mode instead of a system debugger.

Prints a series of expressions together with their inspected values. Useful for print style debugging.

See also: p, Object#inspect.

Prints a series of expressions together with their pretty printed values. Useful for print style debugging.

See also: pp, Object#pretty_inspect.

Defines a Struct type called name with the given properties.

The generated struct has a constructor with the given properties in the same order as declared. The struct only provides getters, not setters, making it immutable by default.

The properties are a sequence of type declarations (x : Int32, x : Int32 = 0) or assigns (x = 0). They declare instance variables and respective getter methods of their name with optional type restrictions and default value.

When passing a block to this macro its body is inserted inside the struct definition. This allows to define additional methods or include modules into the record type (reopening the type would work as well).

An example with type declarations and default values:

An example with assignments (in this case the compiler must be able to infer the types from the default values):

This macro also provides a #copy_with method which returns a copy of the record with the provided properties altered.

Spawns a fiber by first creating a Proc, passing the call's expressions to it, and letting the Proc finally invoke the call.

When using execution contexts, the fiber spawns into the current execution context (Fiber::ExecutionContext.current).

This is because in the first case all spawned fibers refer to the same local variable, while in the second example copies of i are passed to a Proc that eventually invokes the call.

**Examples:**

Example 1 (unknown):
```unknown
puts ARGF.gets_to_end
```

Example 2 (sql):
```sql
$ crystal build program.cr
$ ./program file
123
$ ./program file file
123123
$ # If ARGV is empty, ARGF reads from STDIN instead:
$ echo "hello" | ./program
hello
$ ./program unknown
Unhandled exception: Error opening file with mode 'r': 'unknown': No such file or directory (File::NotFoundError)
...
```

Example 3 (javascript):
```javascript
ARGV.replace ["file1"]
ARGF.gets_to_end # => Content of file1
ARGV             # => []
ARGV << "file2"
ARGF.gets_to_end # => Content of file2
```

Example 4 (javascript):
```javascript
`echo hi`   # => "hi\n"
$?.success? # => true
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/Orc/JITDylib.html

**Contents:**
- class LLVM::Orc::JITDylib
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

EXPERIMENTAL The C API wrapped by this type is marked as experimental by LLVM.

---

## typeof¶

**URL:** https://crystal-lang.org/reference/1.18/syntax_and_semantics/typeof.html

**Contents:**
- typeof¶

The typeof expression returns the type of an expression:

It accepts multiple arguments, and the result is the union of the expression types:

It is often used in generic code, to make use of the compiler's type inference capabilities:

Since typeof doesn't actually evaluate the expression, it can be used on methods at compile time, such as in this example, which recursively forms a union type out of nested generic types:

This expression is also available in the type grammar.

**Examples:**

Example 1 (javascript):
```javascript
a = 1
b = typeof(a) # => Int32
```

Example 2 (javascript):
```javascript
typeof(1, "a", 'a') # => (Int32 | String | Char)
```

Example 3 (csharp):
```csharp
hash = {} of Int32 => String
another_hash = typeof(hash).new # :: Hash(Int32, String)
```

Example 4 (swift):
```swift
class Array
  def self.elem_type(typ)
    if typ.is_a?(Array)
      elem_type(typ.first)
    else
      typ
    end
  end
end

nest = [1, ["b", [:c, ['d']]]]
flat = Array(typeof(Array.elem_type(nest))).new
typeof(nest) # => Array(Int32 | Array(String | Array(Symbol | Array(Char))))
typeof(flat) # => Array(String | Int32 | Symbol | Char)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OAuth2/AuthScheme.html

**Contents:**
- enum OAuth2::AuthScheme
- Overview
- Defined in:
- Enum Members
- Instance Method Summary
  - Instance methods inherited from struct Enum
  - Constructor methods inherited from struct Enum
  - Class methods inherited from struct Enum
  - Macros inherited from struct Enum
  - Instance methods inherited from module Comparable(Enum)

Enum of supported mechanisms used to pass credentials to the server.

According to https://tools.ietf.org/html/rfc6749#section-2.3.1:

"Including the client credentials in the request-body using the two parameters is NOT RECOMMENDED and SHOULD be limited to clients unable to directly utilize the HTTP Basic authentication scheme (or other password-based HTTP authentication schemes)."

Therefore, HTTP Basic is preferred, and Request Body should only be used if the server does not support HTTP Basic.

Returns true if this enum value equals HTTPBasic

Returns true if this enum value equals RequestBody

Returns true if this enum value equals HTTPBasic

Returns true if this enum value equals RequestBody

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Benchmark/BM/Job.html

**Contents:**
- class Benchmark::BM::Job
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

Yielded by Benchmark#bm, use #report to report benchmarks.

Reports a single benchmark unit.

Reports a single benchmark unit.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/ReferenceStorage.html

**Contents:**
- struct ReferenceStorage(T)
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object
- Instance Method Detail

ReferenceStorage(T) provides the minimum storage for the instance data of an object of type T. The compiler guarantees that sizeof(ReferenceStorage(T)) == instance_sizeof(T) and alignof(ReferenceStorage(T)) == instance_alignof(T) always hold, which means Pointer(ReferenceStorage(T)) and T are binary-compatible.

T must be a non-union reference type.

WARNING ReferenceStorage is only necessary for manual memory management, such as creating instances of T with a non-default allocator. Therefore, this type is unsafe and no public constructors are defined.

WARNING ReferenceStorage is unsuitable when instances of T require more than instance_sizeof(T) bytes, such as String and Log::Metadata.

EXPERIMENTAL This type's API is still under development. Join the discussion about custom reference allocation at #13481.

Returns whether self and other are bytewise equal.

Appends this object's value to hasher, and returns the modified hasher.

Returns a T whose instance data refers to self.

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

Returns whether self and other are bytewise equal.

NOTE This does not call T#==, so it works even if self or other does not represent a valid instance of T. If validity is guaranteed, call to_reference == other.to_reference instead to use T#==.

Appends this object's value to hasher, and returns the modified hasher.

Usually the macro def_hash can be used to generate this method. Otherwise, invoke #hash(hasher) on each object's instance variables to accumulate the result:

Returns a T whose instance data refers to self.

WARNING The caller is responsible for ensuring that the instance data is correctly initialized and outlives the returned T.

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

This method is called when an object is interpolated in a string literal:

IO#<< calls this method to append an object to itself:

Thus implementations must not interpolate self in a string literal or call io << self which both would lead to an endless loop.

Also see #inspect(IO).

**Examples:**

Example 1 (python):
```python
def hash(hasher)
  hasher = @some_ivar.hash(hasher)
  hasher = @some_other_ivar.hash(hasher)
  hasher
end
```

Example 2 (unknown):
```unknown
"foo #{bar} baz" # calls bar.to_io with the builder for this string
```

Example 3 (unknown):
```unknown
io << bar # calls bar.to_s(io)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/YAML/ArrayConverter.html

**Contents:**
- module YAML::ArrayConverter(Converter)
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Constructor Detail
- Class Method Detail

Converter to be used with YAML::Serializable to serialize the elements of an Array(T) with the custom converter.

YAML::ArrayConverter.new should be used if the nested converter is also an instance instead of a type.

This implies that YAML::ArrayConverter(T) and YAML::ArrayConverter(T.class).new(T) perform the same serializations.

**Examples:**

Example 1 (json):
```json
require "yaml"

class Timestamp
  include YAML::Serializable

  @[YAML::Field(converter: YAML::ArrayConverter(Time::EpochConverter))]
  property values : Array(Time)
end

timestamp = Timestamp.from_yaml(%({"values":[1459859781,1567628762]}))
timestamp.values  # => [2016-04-05 12:36:21Z, 2019-09-04 20:26:02Z]
timestamp.to_yaml # => "---\nvalues:\n- 1459859781\n- 1567628762\n"
```

Example 2 (json):
```json
require "yaml"

class Timestamp
  include YAML::Serializable

  @[YAML::Field(converter: YAML::ArrayConverter.new(Time::Format.new("%b %-d, %Y")))]
  property values : Array(Time)
end

timestamp = Timestamp.from_yaml(%({"values":["Apr 5, 2016","Sep 4, 2019"]}))
timestamp.values  # => [2016-04-05 00:00:00Z, 2019-09-04 00:00:00Z]
timestamp.to_yaml # => "---\nvalues:\n- Apr 5, 2016\n- Sep 4, 2019\n"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Fiber/ExecutionContext/MultiThreaded.html

**Contents:**
- alias Fiber::ExecutionContext::MultiThreaded
- Overview
- Alias Definition
- Defined in:

DEPRECATED Use Fiber::ExecutionContext::Parallel instead.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Base64.html

**Contents:**
- module Base64
- Overview
  - Example
- Extended Modules
- Defined in:
- Instance Method Summary
- Instance Method Detail

The Base64 module provides for the encoding (#encode, #strict_encode, #urlsafe_encode) and decoding (#decode) of binary data using a base64 representation.

A simple encoding and decoding.

The purpose of using base64 to encode data is that it translates any binary data into purely printable characters.

Writes the base64-decoded version of data to io.

Returns the base64-decoded version of data as a Bytes.

Returns the base64-decoded version of data as a string.

Writes the base64-encoded version of data to io.

Returns the base64-encoded version of data.

Writes the base64-encoded version of data with no newlines to io.

Returns the base64-encoded version of data with no newlines.

Writes the base64-encoded version of data using a urlsafe alphabet to io.

Returns the base64-encoded version of data using a urlsafe alphabet.

Writes the base64-decoded version of data to io. This will decode either the normal or urlsafe alphabets.

Returns the base64-decoded version of data as a Bytes. This will decode either the normal or urlsafe alphabets.

Returns the base64-decoded version of data as a string. This will decode either the normal or urlsafe alphabets.

Writes the base64-encoded version of data to io. This method complies with RFC 2045. Line feeds are added to every 60 encoded characters.

Returns the base64-encoded version of data. This method complies with RFC 2045. Line feeds are added to every 60 encoded characters.

Writes the base64-encoded version of data with no newlines to io. This method complies with RFC 4648.

Returns the base64-encoded version of data with no newlines. This method complies with RFC 4648.

Writes the base64-encoded version of data using a urlsafe alphabet to io. This method complies with "Base 64 Encoding with URL and Filename Safe Alphabet" in RFC 4648.

The alphabet uses '-' instead of '+' and '_' instead of '/'.

Returns the base64-encoded version of data using a urlsafe alphabet. This method complies with "Base 64 Encoding with URL and Filename Safe Alphabet" in RFC 4648.

The alphabet uses '-' instead of '+' and '_' instead of '/'.

The padding parameter defaults to true. When false, enough = characters are not added to make the output divisible by 4.

**Examples:**

Example 1 (javascript):
```javascript
require "base64"

enc = Base64.encode("Send reinforcements") # => "U2VuZCByZWluZm9yY2VtZW50cw==\n"
plain = Base64.decode_string(enc)          # => "Send reinforcements"
```

Example 2 (unknown):
```unknown
Base64.encode("Now is the time for all good coders\nto learn Crystal", STDOUT)
```

Example 3 (unknown):
```unknown
puts Base64.encode("Now is the time for all good coders\nto learn Crystal")
```

Example 4 (unknown):
```unknown
Tm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBjb2RlcnMKdG8gbGVhcm4g
Q3J5c3RhbA==
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/AsyncDispatcher.html

**Contents:**
- class Log::AsyncDispatcher
- Overview
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Log::Dispatcher
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Deliver log entries asynchronously through a channels

Close the dispatcher, releasing resources

Dispatch a log entry to the specified backend

Close the dispatcher, releasing resources

Dispatch a log entry to the specified backend

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/Format/ISO_8601_TIME.html

**Contents:**
- module Time::Format::ISO_8601_TIME
- Overview
- Defined in:
- Class Method Summary
- Class Method Detail

The ISO 8601 time format.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

Formats a Time into the given io.

Formats a Time into a String.

Parses a string into a Time.

**Examples:**

Example 1 (yaml):
```yaml
Time::Format::ISO_8601_TIME.format(Time.utc(2016, 2, 15, 4, 35, 50)) # => "04:35:50Z"
Time::Format::ISO_8601_TIME.parse("04:35:50Z")                       # => 0001-01-01 04:35:50Z
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Gzip/Writer.html

**Contents:**
- class Compress::Gzip::Writer
- Overview
  - Example: compress a file
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class IO
  - Class methods inherited from class IO
  - Instance methods inherited from class Reference

A write-only IO object to compress data in the gzip format.

Instances of this class wrap another IO object. When you write to this instance, it compresses the data and writes it to the underlying IO.

NOTE unless created with a block, #close must be invoked after all data has been written to a Gzip::Writer instance.

Creates a new writer to the given io.

Creates a new writer to the given filename.

Creates a new writer to the given io, yields it to the given block, and closes it at the end.

Creates a new writer to the given filename, yields it to the given block, and closes it at the end.

Returns true if this writer is closed.

Flushes data, forcing writing the gzip header if no data has been written yet.

The header to write to the gzip stream.

Always raises IO::Error because this is a write-only IO.

Whether to close the enclosed IO when closing this writer.

Whether to close the enclosed IO when closing this writer.

Creates a new writer to the given io.

Creates a new writer to the given filename.

Creates a new writer to the given io, yields it to the given block, and closes it at the end.

Creates a new writer to the given filename, yields it to the given block, and closes it at the end.

Closes this writer. Must be invoked after all data has been written.

Returns true if this writer is closed.

Flushes data, forcing writing the gzip header if no data has been written yet.

The header to write to the gzip stream. It will be written just before the first write to this writer. Changes to the header after the first write are ignored.

Always raises IO::Error because this is a write-only IO.

Whether to close the enclosed IO when closing this writer.

Whether to close the enclosed IO when closing this writer.

**Examples:**

Example 1 (julia):
```julia
require "compress/gzip"

File.write("file.txt", "abc")

File.open("./file.txt", "r") do |input_file|
  File.open("./file.gzip", "w") do |output_file|
    Compress::Gzip::Writer.open(output_file) do |gzip|
      IO.copy(input_file, gzip)
    end
  end
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/IO.html

**Contents:**
- abstract class IO
- Overview
  - Encoding
- Direct Known Subclasses
- Defined in:
- Constant Summary
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference

The IO class is the basis for all input and output in Crystal.

This class is inherited by types like File, Socket and IO::Memory and provides many useful methods for reading from and writing to an IO, like #print, #puts, #gets and #printf.

The only requirement for a type including the IO module is to define these two methods:

For example, this is a simple IO on top of a Bytes:

An IO can be set an encoding with the #set_encoding method. When this is set, all string operations (#gets, #gets_to_end, #read_char, <<, #print, #puts #printf) will write in the given encoding, and read from the given encoding. Byte operations (#read, #write, #read_byte, #write_byte, #getb_to_end) never do encoding/decoding operations.

If an encoding is not set, the default one is UTF-8.

Mixing string and byte operations might not give correct results and should be avoided, as string operations might need to read extra bytes in order to get characters in the given encoding.

Default size used for generic stream buffers.

Copy at most limit bytes from src to dst.

Copy all contents from src to dst.

Creates a pair of pipe endpoints (connected to each other) and returns them as a two-element Tuple.

Creates a pair of pipe endpoints (connected to each other) and passes them to the given block.

Compares two streams stream1 to stream2 to determine if they are identical.

Writes the given object into this IO.

Returns true if this IO is closed.

Invokes the given block with each byte (UInt8) in this IO.

Returns an Iterator for the bytes in this IO.

Invokes the given block with each Char in this IO.

Returns an Iterator for the chars in this IO.

Invokes the given block with each line in this IO, where a line is defined by the arguments passed to this method, which can be the same ones as in the #gets methods.

Returns an Iterator for the lines in this IO, where a line is defined by the arguments passed to this method, which can be the same ones as in the #gets methods.

Returns this IO's encoding.

Flushes buffered data, if any.

Reads the rest of this IO data as a writable Bytes.

Reads until delimiter is found, limit bytes are read, or the end of the IO is reached.

Reads a line from this IO.

Reads a line of at most limit bytes from this IO.

Reads until delimiter is found, or the end of the IO is reached.

Reads until delimiter is found or the end of the IO is reached.

Reads the rest of this IO data as a String.

Peeks into this IO, if possible.

Returns the current position (in bytes) in this IO.

Sets the current position (in bytes) in this IO.

Writes the given objects into this IO by invoking to_s(io) on each of the objects.

Writes a formatted string to this IO.

Writes a formatted string to this IO.

Writes string to this IO, followed by a newline character unless the string already ends with one.

Writes obj to this IO, followed by a newline character.

Writes a newline character.

Writes objects to this IO, each followed by a newline character unless the object is a String and already ends with a newline.

Reads at most slice.size bytes from this IO into slice.

Yields an IO to read a section inside this IO.

Reads a single byte from this IO.

Reads an instance of the given type from this IO using the specified format.

Reads a single Char from this IO.

Tries to read exactly slice.size bytes from this IO into slice.

Tries to read exactly slice.size bytes from this IO into slice.

Same as #gets, but raises EOFError if called at the end of this IO.

Reads an UTF-8 encoded string of exactly bytesize bytes.

Reads UTF-8 decoded bytes into the given slice.

Reads a single decoded UTF-8 byte from this IO.

Seeks to a given offset (in bytes) according to the whence argument.

Sets the encoding of this IO.

Reads and discards exactly bytes_count bytes.

Reads and discards bytes from self until there are no more bytes.

Returns true if this IO is associated with a terminal device (tty), false otherwise.

Writes the contents of slice into this IO.

Writes a single byte into this IO.

Writes the given object to this IO using the specified format.

Writes the contents of slice, interpreted as a sequence of UTF-8 or ASCII characters, into this IO.

Writes the contents of slice, interpreted as a sequence of UTF-8 or ASCII characters, into this IO.

DEPRECATED Use #write_string instead.

Copy at most limit bytes from src to dst.

Copy all contents from src to dst.

Creates a pair of pipe endpoints (connected to each other) and returns them as a two-element Tuple.

Creates a pair of pipe endpoints (connected to each other) and passes them to the given block. Both endpoints are closed after the block.

Compares two streams stream1 to stream2 to determine if they are identical. Returns true if content are the same, false otherwise.

Writes the given object into this IO. This ends up calling to_s(io) on the object.

IO defines this is a no-op method, but including types may override.

Returns true if this IO is closed.

IO defines returns false, but including types may override.

Invokes the given block with each byte (UInt8) in this IO.

Returns an Iterator for the bytes in this IO.

Invokes the given block with each Char in this IO.

Returns an Iterator for the chars in this IO.

Invokes the given block with each line in this IO, where a line is defined by the arguments passed to this method, which can be the same ones as in the #gets methods.

Returns an Iterator for the lines in this IO, where a line is defined by the arguments passed to this method, which can be the same ones as in the #gets methods.

Returns this IO's encoding. The default is UTF-8.

Flushes buffered data, if any.

IO defines this is a no-op method, but including types may override.

Reads the rest of this IO data as a writable Bytes.

Reads until delimiter is found, limit bytes are read, or the end of the IO is reached. Returns nil if called at the end of this IO.

Reads a line from this IO. A line is terminated by the \n character. Returns nil if called at the end of this IO.

By default the newline is removed from the returned string, unless chomp is false.

Reads a line of at most limit bytes from this IO. A line is terminated by the \n character. Returns nil if called at the end of this IO.

Reads until delimiter is found, or the end of the IO is reached. Returns nil if called at the end of this IO.

Reads until delimiter is found or the end of the IO is reached. Returns nil if called at the end of this IO.

Reads the rest of this IO data as a String.

Peeks into this IO, if possible.

The returned bytes are only valid data until a next call to any method that reads from this IO is invoked.

By default this method returns nil, but IO implementations that provide buffering or wrap other IOs should override this method.

Returns the current position (in bytes) in this IO.

The IO class raises on this method, but some subclasses, notable IO::FileDescriptor and IO::Memory implement it.

Sets the current position (in bytes) in this IO.

The IO class raises on this method, but some subclasses, notable IO::FileDescriptor and IO::Memory implement it.

Writes the given objects into this IO by invoking to_s(io) on each of the objects.

Writes a formatted string to this IO. For details on the format string, see top-level ::printf.

Writes a formatted string to this IO. For details on the format string, see top-level ::printf.

Writes string to this IO, followed by a newline character unless the string already ends with one.

Writes obj to this IO, followed by a newline character.

Writes a newline character.

Writes objects to this IO, each followed by a newline character unless the object is a String and already ends with a newline.

Reads at most slice.size bytes from this IO into slice. Returns the number of bytes read, which is 0 if and only if there is no more data to read (so checking for 0 is the way to detect end of file).

Yields an IO to read a section inside this IO.

The IO class raises on this method, but some subclasses, notable File and IO::Memory implement it.

Multiple sections can be read concurrently.

Reads a single byte from this IO. Returns nil if there is no more data to read.

Reads an instance of the given type from this IO using the specified format.

This ends up invoking type.from_io(self, format), so any type defining a from_io(io : IO, format : IO::ByteFormat = IO::ByteFormat::SystemEndian) method can be read in this way.

See Int.from_io and Float.from_io.

Reads a single Char from this IO. Returns nil if there is no more data to read.

Tries to read exactly slice.size bytes from this IO into slice. Raises EOFError if there aren't slice.size bytes of data.

Tries to read exactly slice.size bytes from this IO into slice. Returns nil if there aren't slice.size bytes of data, otherwise returns the number of bytes read.

Same as #gets, but raises EOFError if called at the end of this IO.

Reads an UTF-8 encoded string of exactly bytesize bytes. Raises EOFError if there are not enough bytes to build the string.

Reads UTF-8 decoded bytes into the given slice. Returns the number of UTF-8 bytes read.

If no encoding is set, this is the same as #read(slice).

Reads a single decoded UTF-8 byte from this IO. Returns nil if there is no more data to read.

If no encoding is set, this is the same as #read_byte.

Rewinds this IO. By default this method raises, but including types may implement it.

Seeks to a given offset (in bytes) according to the whence argument.

The IO class raises on this method, but some subclasses, notable IO::FileDescriptor and IO::Memory implement it.

Sets the encoding of this IO.

The invalid argument can be:

String operations (#gets, #gets_to_end, #read_char, <<, #print, #puts #printf) will use this encoding.

Reads and discards exactly bytes_count bytes. Raises IO::EOFError if there aren't at least bytes_count bytes.

Reads and discards bytes from self until there are no more bytes.

Returns true if this IO is associated with a terminal device (tty), false otherwise.

IO returns false, but including types may override.

Writes the contents of slice into this IO.

Writes a single byte into this IO.

Writes the given object to this IO using the specified format.

This ends up invoking object.to_io(self, format), so any object defining a to_io(io : IO, format : IO::ByteFormat = IO::ByteFormat::SystemEndian) method can be written in this way.

See Int#to_io and Float#to_io.

Writes the contents of slice, interpreted as a sequence of UTF-8 or ASCII characters, into this IO. The contents are transcoded into this IO's current encoding.

Writes the contents of slice, interpreted as a sequence of UTF-8 or ASCII characters, into this IO. The contents are transcoded into this IO's current encoding.

DEPRECATED Use #write_string instead.

**Examples:**

Example 1 (python):
```python
class SimpleSliceIO < IO
  def initialize(@slice : Bytes)
  end

  def read(slice : Bytes)
    slice.size.times { |i| slice[i] = @slice[i] }
    @slice += slice.size
    slice.size
  end

  def write(slice : Bytes) : Nil
    slice.size.times { |i| @slice[i] = slice[i] }
    @slice += slice.size
  end
end

slice = Slice.new(9) { |i| ('a'.ord + i).to_u8 }
String.new(slice) # => "abcdefghi"

io = SimpleSliceIO.new(slice)
io.gets(3) # => "abc"
io.print "xyz"
String.new(slice) # => "abcxyzghi"
```

Example 2 (javascript):
```javascript
io = IO::Memory.new "hello"
io2 = IO::Memory.new

IO.copy io, io2, 3

io2.to_s # => "hel"
```

Example 3 (javascript):
```javascript
io = IO::Memory.new "hello"
io2 = IO::Memory.new

IO.copy io, io2

io2.to_s # => "hello"
```

Example 4 (javascript):
```javascript
reader, writer = IO.pipe
writer.puts "hello"
writer.puts "world"
reader.gets # => "hello"
reader.gets # => "world"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Random/PCG32.html

**Contents:**
- class Random::PCG32
- Overview
- Included Modules
- Defined in:
- Constant Summary
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Random
  - Constructor methods inherited from module Random
  - Class methods inherited from module Random

pcg32_random_r: - result: 32-bit unsigned int (uint32_t) - period: 2^64 (* 2^63 streams) - state type: pcg32_random_t (16 bytes) - output func: XSH-RR

Generates a random unsigned integer.

Generates a random unsigned integer.

The integers must be uniformly distributed between 0 and the maximal value for the chosen type.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Zlib.html

**Contents:**
- module Compress::Zlib
- Overview
- Defined in:
- Constant Summary

The Compress::Zlib module contains readers and writers of zlib format compressed data, as specified in RFC 1950.

NOTE To use Zlib or its children, you must explicitly import it with require "compress/zlib"

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Enumerable/Chunk/Drop.html

**Contents:**
- struct Enumerable::Chunk::Drop
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Can be used in Enumerable#chunks and specifies that the elements should be dropped.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/String/Builder.html

**Contents:**
- class String::Builder
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class IO
  - Class methods inherited from class IO
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference

Similar to IO::Memory, but optimized for building a single string.

You should never have to deal with this class. Instead, use String.build.

Moves the write pointer, and the resulting string bytesize, by the given amount.

Chomps the last byte from the string buffer.

Reads at most slice.size bytes from this IO into slice.

Sets the encoding of this IO.

Returns a nicely readable and concise string representation of this object, typically intended for users.

Writes the contents of slice into this IO.

Writes a single byte into this IO.

Writes the contents of slice, interpreted as a sequence of UTF-8 or ASCII characters, into this IO.

Moves the write pointer, and the resulting string bytesize, by the given amount.

Chomps the last byte from the string buffer. If the byte is '\n' and there's a '\r' before it, it is also removed.

Reads at most slice.size bytes from this IO into slice. Returns the number of bytes read, which is 0 if and only if there is no more data to read (so checking for 0 is the way to detect end of file).

Sets the encoding of this IO.

The invalid argument can be:

String operations (gets, gets_to_end, read_char, <<, print, puts printf) will use this encoding.

Returns a nicely readable and concise string representation of this object, typically intended for users.

This method should usually not be overridden. It delegates to #to_s(IO) which can be overridden for custom implementations.

Writes the contents of slice into this IO.

Writes a single byte into this IO.

Writes the contents of slice, interpreted as a sequence of UTF-8 or ASCII characters, into this IO. The contents are transcoded into this IO's current encoding.

**Examples:**

Example 1 (javascript):
```javascript
io = IO::Memory.new "hello"
slice = Bytes.new(4)
io.read(slice) # => 4
slice          # => Bytes[104, 101, 108, 108]
io.read(slice) # => 1
slice          # => Bytes[111, 101, 108, 108]
io.read(slice) # => 0
```

Example 2 (javascript):
```javascript
io = IO::Memory.new
slice = Bytes.new(4) { |i| ('a'.ord + i).to_u8 }
io.write(slice)
io.to_s # => "abcd"
```

Example 3 (javascript):
```javascript
io = IO::Memory.new
io.write_byte 97_u8
io.to_s # => "a"
```

Example 4 (javascript):
```javascript
bytes = "你".to_slice # => Bytes[228, 189, 160]

io = IO::Memory.new
io.set_encoding("GB2312")
io.write_string(bytes)
io.to_slice # => Bytes[196, 227]

"你".encode("GB2312") # => Bytes[196, 227]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Digest/CRC32.html

**Contents:**
- class Digest::CRC32
- Overview
- Extended Modules
- Defined in:
- Constructors
- Class Method Summary
  - Instance methods inherited from class Digest
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Implements the CRC32 checksum algorithm.

NOTE To use CRC32, you must explicitly import it with require "digest/crc32"

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/Orc/ThreadSafeContext.html

**Contents:**
- class LLVM::Orc::ThreadSafeContext
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

EXPERIMENTAL The C API wrapped by this type is marked as experimental by LLVM.

This constructor is only available with LLVM 21 and above.

This constructor is only available with LLVM 21 and above.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/System.html

**Contents:**
- module System
- Defined in:
- Class Method Summary
- Class Method Detail

Returns the number of logical processors available to the system.

Returns the hostname.

Returns the number of logical processors available to the system.

Returns the hostname.

NOTE Maximum of 253 characters are allowed, with 2 bytes reserved for storage. In practice, many platforms will disallow anything longer than 63 characters.

**Examples:**

Example 1 (javascript):
```javascript
System.cpu_count # => 4
```

Example 2 (javascript):
```javascript
System.hostname # => "host.example.org"
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/OverflowError.html

**Contents:**
- class OverflowError
- Overview
- Defined in:
- Constructors
  - Instance methods inherited from class Exception
  - Constructor methods inherited from class Exception
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

Raised when the result of an arithmetic operation is outside of the range that can be represented within the given operands types.

**Examples:**

Example 1 (yaml):
```yaml
Int32::MAX + 1      # raises OverflowError (Arithmetic overflow)
Int32::MIN - 1      # raises OverflowError (Arithmetic overflow)
Float64::MAX.to_f32 # raises OverflowError (Arithmetic overflow)
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/Builder.html

**Contents:**
- class Log::Builder
- Overview
- Included Modules
- Defined in:
- Instance Method Summary
  - Instance methods inherited from module Log::Configuration
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object

A Log::Builder creates Log instances for a given source. It allows you to bind sources and patterns to a given backend. Already created Log will be reconfigured as needed.

Binds a source pattern to a backend for all logs that are of severity equal or higher to level.

Removes all existing bindings.

Returns a Log for the given source with a severity level and backend according to the bindings in self.

Binds a source pattern to a backend for all logs that are of severity equal or higher to level.

Removes all existing bindings.

Returns a Log for the given source with a severity level and backend according to the bindings in self. If new bindings are applied, the existing Log instances will be reconfigured. Calling this method multiple times with the same value will return the same object.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/BasicBlockCollection.html

**Contents:**
- struct LLVM::BasicBlockCollection
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Enumerable(LLVM::BasicBlock)
  - Class methods inherited from module Enumerable(LLVM::BasicBlock)
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value

Must yield this collection's elements to the block.

Must yield this collection's elements to the block.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/JSON/HashValueConverter.html

**Contents:**
- module JSON::HashValueConverter(Converter)
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Constructor Detail
- Class Method Detail

Converter to be used with JSON::Serializable to serialize the values of a Hash(String, V) with the custom converter.

JSON::HashValueConverter.new should be used if the nested converter is also an instance instead of a type.

This implies that JSON::HashValueConverter(T) and JSON::HashValueConverter(T.class).new(T) perform the same serializations.

**Examples:**

Example 1 (json):
```json
require "json"

class TimestampHash
  include JSON::Serializable

  @[JSON::Field(converter: JSON::HashValueConverter(Time::EpochConverter))]
  property birthdays : Hash(String, Time)
end

timestamp = TimestampHash.from_json(%({"birthdays":{"foo":1459859781,"bar":1567628762}}))
timestamp.birthdays # => {"foo" => 2016-04-05 12:36:21Z, "bar" => 2019-09-04 20:26:02Z}
timestamp.to_json   # => %({"birthdays":{"foo":1459859781,"bar":1567628762}})
```

Example 2 (json):
```json
require "json"

class TimestampHash
  include JSON::Serializable

  @[JSON::Field(converter: JSON::HashValueConverter.new(Time::Format.new("%b %-d, %Y")))]
  property birthdays : Hash(String, Time)
end

timestamp = TimestampHash.from_json(%({"birthdays":{"foo":"Apr 5, 2016","bar":"Sep 4, 2019"}}))
timestamp.birthdays # => {"foo" => 2016-04-05 00:00:00Z, "bar" => 2019-09-04 00:00:00Z}
timestamp.to_json   # => %({"birthdays":{"foo":"Apr 5, 2016","bar":"Sep 4, 2019"}})
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Spec/Item.html

**Contents:**
- module Spec::Item
- Overview
- Direct including types
- Defined in:
- Instance Method Summary
- Instance Method Detail

Info that describe, context and it all have in common.

All tags, including tags inherited from ancestor example groups

The example or example group's description.

The line where the example or example group ends.

The file where the example or example group is defined.

Does this example or example group have focus: true on it?

The line where the example or example group starts.

The describe/context that wraps this example or example group.

The tags defined on this example or example group

All tags, including tags inherited from ancestor example groups

The example or example group's description.

The line where the example or example group ends.

The file where the example or example group is defined.

Does this example or example group have focus: true on it?

The line where the example or example group starts.

The describe/context that wraps this example or example group.

The tags defined on this example or example group

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/IO/Error.html

**Contents:**
- class IO::Error
- Included Modules
- Extended Modules
- Direct Known Subclasses
- Defined in:
- Constructors
- Macro Summary
- Instance Method Summary
  - Instance methods inherited from module SystemError
  - Instance methods inherited from class Exception

Builds an instance of the exception from the current system error value (Errno.value).

DEPRECATED Use .from_os_error instead

Builds an instance of the exception from the current windows error value (WinError.value).

Builds an instance of the exception from the current Windows Socket API error value (WinError.wsa_value).

Builds an instance of the exception from the current system error value (Errno.value).

The system message corresponding to the OS error value amends the message. Additional keyword arguments are forwarded to the exception initializer .new_from_os_error.

DEPRECATED Use .from_os_error instead

Builds an instance of the exception from the current windows error value (WinError.value).

The system message corresponding to the OS error value amends the message. Additional keyword arguments are forwarded to the exception initializer .new_from_os_error.

Builds an instance of the exception from the current Windows Socket API error value (WinError.wsa_value).

The system message corresponding to the OS error value amends the message. Additional keyword arguments are forwarded to the exception initializer.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Gzip.html

**Contents:**
- module Compress::Gzip
- Overview
- Defined in:
- Constant Summary

The Gzip module contains readers and writers of gzip format compressed data, as specified in RFC 1952.

NOTE To use Gzip or its children, you must explicitly import it with require "compress/gzip"

---

## Testing Crystal Code¶

**URL:** https://crystal-lang.org/reference/1.18/guides/testing.html

**Contents:**
- Testing Crystal Code¶
- Anatomy of a spec file¶
- Expectations¶
  - Equivalence, Identity and Type¶
  - Truthiness¶
  - Comparisons¶
  - Other matchers¶
  - Expecting errors¶
- Focusing on a group of specs¶
- Tagging specs¶

Crystal comes with a fully-featured spec library in the Spec module. It provides a structure for writing executable examples of how your code should behave.

Inspired by Rspec, it includes a domain specific language (DSL) that allows you to write examples in a way similar to plain english.

A basic spec looks something like this:

To use the spec module and DSL, you need to add require "spec" to your spec files. Many projects use a custom spec helper which organizes these includes.

Concrete test cases are defined in it blocks. An optional (but strongly recommended) descriptive string states it's purpose and a block contains the main logic performing the test.

Test cases that have been defined or outlined but are not yet expected to work can be defined using pending instead of it. They will not be run but show up in the spec report as pending.

An it block contains an example that should invoke the code to be tested and define what is expected of it. Each example can contain multiple expectations, but it should test only one specific behaviour.

When spec is included, every object has the instance methods #should and #should_not. These methods are invoked on the value being tested with an expectation as argument. If the expectation is met, code execution continues. Otherwise the example has failed and other code in this block will not be executed.

In test files, specs are structured by example groups which are defined by describe and context sections. Typically a top level describe defines the outer unit (such as a class) to be tested by the spec. Further describe sections can be nested within the outer unit to specify smaller units under test (such as individual methods).

For unit tests, it is recommended to follow the conventions for method names: Outer describe is the name of the class, inner describe targets methods. Instance methods are prefixed with #, class methods with ..

To establish certain contexts - think empty array versus array with elements - the context method may be used to communicate this to the reader. It has a different name, but behaves exactly like describe.

describe and context take a description as argument (which should usually be a string) and a block containing the individual specs or nested groupings.

Expectations define if the value being tested (actual) matches a certain value or specific criteria.

There are methods to create expectations which test for equivalence (eq), identity (be), type (be_a), and nil (be_nil). Note that the identity expectation uses .same? which tests if #object_id are identical. This is only true if the expected value points to the same object instead of an equivalent one. This is only possible for reference types and won't work for value types like structs or numbers.

These matchers run a block and pass if it raises a certain exception.

expect_raises returns the rescued exception so it can be used for further expectations, for example to verify specific properties of the exception.

describe, context and it blocks can be marked with focus: true, like this:

If any such thing is marked with focus: true then only those examples will run.

Tags can be used to group specs, allowing to only run a subset of specs when providing a --tag argument to the spec runner (see Using the compiler).

describe, context and it blocks can be tagged, like this:

Tagging an example group (describe or context) extends to all of the contained examples.

Multiple tags can be specified by giving an Enumerable, such as Array or Set.

The Crystal compiler has a spec command with tools to constrain which examples get run and tailor the output. All specs of a project are compiled and executed through the command crystal spec.

By convention, specs live in the spec/ directory of a project. Spec files must end with _spec.cr to be recognizable as such by the compiler command.

You can compile and run specs from folder trees, individual files, or specific lines in a file. If the specified line is the beginning of a describe or context section, all specs inside that group are run.

The default formatter outputs the file and line style command for failing specs which makes it easy to rerun just this individual spec.

You can turn off colors with the switch --no-color.

Specs, by default, run in the order defined, but can be run in a random order by passing --order random to crystal spec.

Specs run in random order will display a seed value upon completion. This seed value can be used to rerun the specs in that same order by passing the seed value to --order.

There are additional options for running specs by name, adjusting output formats, doing dry-runs, etc, see Using the compiler.

Many projects use a custom spec helper file, usually named spec/spec_helper.cr.

This file is used to require spec and other includes like code from the project needed for every spec file. This is also a good place to define global helper methods that make writing specs easier and avoid code duplication.

**Examples:**

Example 1 (swift):
```swift
require "spec"

describe Array do
  describe "#size" do
    it "correctly reports the number of elements in the Array" do
      [1, 2, 3].size.should eq 3
    end
  end

  describe "#empty?" do
    it "is true when no elements are in the array" do
      ([] of Int32).empty?.should be_true
    end

    it "is false if there are elements in the array" do
      [1].empty?.should be_false
    end
  end
end
```

Example 2 (unknown):
```unknown
actual.should eq(expected)   # passes if actual == expected
actual.should be(expected)   # passes if actual.same?(expected)
actual.should be_a(expected) # passes if actual.is_a?(expected)
actual.should be_nil         # passes if actual.nil?
```

Example 3 (unknown):
```unknown
actual.should be_true   # passes if actual == true
actual.should be_false  # passes if actual == false
actual.should be_truthy # passes if actual is truthy (neither nil nor false nor Pointer.null)
actual.should be_falsey # passes if actual is falsey (nil, false or Pointer.null)
```

Example 4 (unknown):
```unknown
actual.should be < expected  # passes if actual <  expected
actual.should be <= expected # passes if actual <= expected
actual.should be > expected  # passes if actual >  expected
actual.should be >= expected # passes if actual >= expected
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Zlib/Writer.html

**Contents:**
- class Compress::Zlib::Writer
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class IO
  - Class methods inherited from class IO
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference

A write-only IO object to compress data in the zlib format.

Instances of this class wrap another IO object. When you write to this instance, it compresses the data and writes it to the underlying IO.

NOTE unless created with a block, #close must be invoked after all data has been written to a Zlib::Writer instance.

Creates a new writer to the given io.

Creates a new writer to the given filename.

Creates a new writer to the given io, yields it to the given block, and closes it at the end.

Creates a new writer to the given filename, yields it to the given block, and closes it at the end.

Returns true if this writer is closed.

Flushes data, forcing writing the zlib header if no data has been written yet.

Always raises IO::Error because this is a write-only IO.

Whether to close the enclosed IO when closing this writer.

Whether to close the enclosed IO when closing this writer.

Creates a new writer to the given io.

Creates a new writer to the given filename.

Creates a new writer to the given io, yields it to the given block, and closes it at the end.

Creates a new writer to the given filename, yields it to the given block, and closes it at the end.

Closes this writer. Must be invoked after all data has been written.

Returns true if this writer is closed.

Flushes data, forcing writing the zlib header if no data has been written yet.

Always raises IO::Error because this is a write-only IO.

Whether to close the enclosed IO when closing this writer.

Whether to close the enclosed IO when closing this writer.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Number.html

**Contents:**
- abstract struct Number
- Overview
- Included Modules
- Direct Known Subclasses
- Defined in:
- Constant Summary
- Constructors
- Class Method Summary
- Macro Summary
- Instance Method Summary

The top-level number type.

Default SI prefixes ordered by magnitude.

SI prefixes used by #humanize. Equal to SI_PREFIXES but prepends the prefix with a space character.

Returns the additive identity of this type.

Returns the multiplicative identity of this type.

Returns the value zero in the respective type.

Returns the SI prefix for magnitude.

Creates an Array of self with the given values, which will be casted to this type with the new method (defined in each Number type).

Creates a Slice of self with the given values, which will be casted to this type with the new method (defined in each Number type).

Creates a StaticArray of self with the given values, which will be casted to this type with the new method (defined in each Number type).

Divides self by other using floored division.

The comparison operator.

Returns the absolute value of this number.

Returns the square of self (self * self).

Cis is a mathematical notation representing cos x + i sin x.

Returns a Tuple of two elements containing the quotient and modulus obtained by dividing self by number.

Prints this number as a String using a customizable format.

Prints this number as a String using a customizable format.

See Object#hash(hasher)

Pretty prints this number as a String in a human-readable format.

Pretty prints this number as a String in a human-readable format.

Pretty prints this number as a String in a human-readable format.

Pretty prints this number as a String in a human-readable format.

Pretty prints this number as a String in a human-readable format.

Pretty prints this number as a String in a human-readable format.

Returns a Complex object with the value of self as the imaginary part.

Returns true if self is an integer.

Returns true if self is less than zero.

Returns true if self is greater than zero.

Rounds self to an integer value using rounding mode.

Rounds this number to a given precision.

Returns the sign of this number as an Int32.

Keeps digits significant digits of this number in the given base.

Performs a #step in the direction of the limit.

Performs a #step in the direction of the limit.

Returns a Complex object with the value of self as the real part.

Returns true if self is equal to zero.

Returns the additive identity of this type.

For numerical types, it is the value 0 expressed in the respective type.

Returns the multiplicative identity of this type.

For numerical types, it is the value 1 expressed in the respective type.

Returns the value zero in the respective type.

Returns the SI prefix for magnitude.

Creates an Array of self with the given values, which will be casted to this type with the new method (defined in each Number type).

This is similar to an array literal of the same item type:

Creates a Slice of self with the given values, which will be casted to this type with the new method (defined in each Number type).

The slice is allocated on the heap.

This is a convenient alternative to Slice.[] for designating a specific item type which also considers autocasting.

Creates a StaticArray of self with the given values, which will be casted to this type with the new method (defined in each Number type).

This is a convenvenient alternative to StaticArray.[] for designating a specific item type which also considers autocasting.

Divides self by other using floored division.

The result will be of the same type as self.

The comparison operator.

Returns the absolute value of this number.

Returns the square of self (self * self).

Cis is a mathematical notation representing cos x + i sin x.

Returns a Complex object with real part Math.cos(self) and imaginary part Math.sin(self), where self represents the angle in radians.

Returns a Tuple of two elements containing the quotient and modulus obtained by dividing self by number.

Prints this number as a String using a customizable format.

separator is used as decimal separator, delimiter as thousands delimiter between batches of group digits.

If decimal_places is nil, all significant decimal places are printed (similar to #to_s). If the argument has a numeric value, the number of visible decimal places will be fixed to that amount.

Trailing zeros are omitted if only_significant is true.

Prints this number as a String using a customizable format.

separator is used as decimal separator, delimiter as thousands delimiter between batches of group digits.

If decimal_places is nil, all significant decimal places are printed (similar to #to_s). If the argument has a numeric value, the number of visible decimal places will be fixed to that amount.

Trailing zeros are omitted if only_significant is true.

See Object#hash(hasher)

Pretty prints this number as a String in a human-readable format.

This is particularly useful if a number can have a wide value range and the exact value is less relevant.

It rounds the number to the nearest thousands magnitude with precision number of significant digits. The order of magnitude is expressed with an appended quantifier. By default, SI prefixes are used (see SI_PREFIXES).

If significant is false, the number of precision digits is preserved after the decimal separator.

separator describes the decimal separator, delimiter the thousands delimiter (see #format).

unit_separator is inserted between the value and the unit. Users are encouraged to use a non-breaking space ('\u00A0') to prevent output being split across lines.

See Int#humanize_bytes to format a file size.

Pretty prints this number as a String in a human-readable format.

This is particularly useful if a number can have a wide value range and the exact value is less relevant.

It rounds the number to the nearest thousands magnitude with precision number of significant digits. The order of magnitude is expressed with an appended quantifier. By default, SI prefixes are used (see SI_PREFIXES).

If significant is false, the number of precision digits is preserved after the decimal separator.

separator describes the decimal separator, delimiter the thousands delimiter (see #format).

This methods yields the order of magnitude and self and expects the block to return a Tuple(Int32, _) containing the (adjusted) magnitude and unit. The magnitude is typically adjusted to a multiple of 3.

See Int#humanize_bytes to format a file size.

Pretty prints this number as a String in a human-readable format.

This is particularly useful if a number can have a wide value range and the exact value is less relevant.

It rounds the number to the nearest thousands magnitude with precision number of significant digits. The order of magnitude is expressed with an appended quantifier. By default, SI prefixes are used (see SI_PREFIXES).

If significant is false, the number of precision digits is preserved after the decimal separator.

separator describes the decimal separator, delimiter the thousands delimiter (see #format).

unit_separator is inserted between the value and the unit. Users are encouraged to use a non-breaking space ('\u00A0') to prevent output being split across lines.

See Int#humanize_bytes to format a file size.

Pretty prints this number as a String in a human-readable format.

This is particularly useful if a number can have a wide value range and the exact value is less relevant.

It rounds the number to the nearest thousands magnitude with precision number of significant digits. The order of magnitude is expressed with an appended quantifier. By default, SI prefixes are used (see SI_PREFIXES).

If significant is false, the number of precision digits is preserved after the decimal separator.

separator describes the decimal separator, delimiter the thousands delimiter (see #format).

This methods yields the order of magnitude and self and expects the block to return a Tuple(Int32, _) containing the (adjusted) magnitude and unit. The magnitude is typically adjusted to a multiple of 3.

See Int#humanize_bytes to format a file size.

Pretty prints this number as a String in a human-readable format.

This is particularly useful if a number can have a wide value range and the exact value is less relevant.

It rounds the number to the nearest thousands magnitude with precision number of significant digits. The order of magnitude is expressed with an appended quantifier. By default, SI prefixes are used (see SI_PREFIXES).

If significant is false, the number of precision digits is preserved after the decimal separator.

separator describes the decimal separator, delimiter the thousands delimiter (see #format).

This methods yields the order of magnitude and self and expects the block to return a Tuple(Int32, _) containing the (adjusted) magnitude and unit. The magnitude is typically adjusted to a multiple of 3.

See Int#humanize_bytes to format a file size.

Pretty prints this number as a String in a human-readable format.

This is particularly useful if a number can have a wide value range and the exact value is less relevant.

It rounds the number to the nearest thousands magnitude with precision number of significant digits. The order of magnitude is expressed with an appended quantifier. By default, SI prefixes are used (see SI_PREFIXES).

If significant is false, the number of precision digits is preserved after the decimal separator.

separator describes the decimal separator, delimiter the thousands delimiter (see #format).

This methods yields the order of magnitude and self and expects the block to return a Tuple(Int32, _) containing the (adjusted) magnitude and unit. The magnitude is typically adjusted to a multiple of 3.

See Int#humanize_bytes to format a file size.

Returns a Complex object with the value of self as the imaginary part.

Returns true if self is an integer.

Non-integer types may return true as long as self denotes a finite value without any fractional parts.

Returns true if self is less than zero.

Returns true if self is greater than zero.

Rounds self to an integer value using rounding mode.

The rounding mode controls the direction of the rounding. The default is RoundingMode::TIES_EVEN which rounds to the nearest integer, with ties (fractional value of 0.5) being rounded to the even neighbor (Banker's rounding).

Rounds this number to a given precision.

Rounds to the specified number of digits after the decimal place, (or before if negative), in base base.

The rounding mode controls the direction of the rounding. The default is RoundingMode::TIES_EVEN which rounds to the nearest integer, with ties (fractional value of 0.5) being rounded to the even neighbor (Banker's rounding).

Returns the sign of this number as an Int32.

Keeps digits significant digits of this number in the given base.

Performs a #step in the direction of the limit. For instance:

Performs a #step in the direction of the limit. For instance:

Returns a Complex object with the value of self as the real part.

Returns true if self is equal to zero.

**Examples:**

Example 1 (javascript):
```javascript
Int32.additive_identity   # => 0
Float64.additive_identity # => 0.0
```

Example 2 (javascript):
```javascript
Int32.multiplicative_identity   # => 1
Float64.multiplicative_identity # => 1.0
```

Example 3 (javascript):
```javascript
Int32.zero   # => 0
Float64.zero # => 0.0
```

Example 4 (javascript):
```javascript
Number.si_prefix(3) # => 'k'
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/Orc/ThreadSafeModule.html

**Contents:**
- class LLVM::Orc::ThreadSafeModule
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

EXPERIMENTAL The C API wrapped by this type is marked as experimental by LLVM.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ParameterCollection.html

**Contents:**
- struct LLVM::ParameterCollection
- Included Modules
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Indexable(LLVM::Value)
  - Class methods inherited from module Indexable(LLVM::Value)
  - Instance methods inherited from module Enumerable(LLVM::Value)
  - Class methods inherited from module Enumerable(LLVM::Value)
  - Instance methods inherited from module Iterable(LLVM::Value)

Returns the number of elements in this container.

Returns an Array with all the elements in the collection.

Returns the element at the given index, without doing any bounds check.

Returns the number of elements in this container.

Returns an Array with all the elements in the collection.

Returns the element at the given index, without doing any bounds check.

Indexable makes sure to invoke this method with index in 0...size, so converting negative indices to positive ones is not needed here.

Clients never invoke this method directly. Instead, they access elements with #[](index) and #[]?(index).

This method should only be directly invoked if you are absolutely sure the index is in bounds, to avoid a bounds check for a small boost of performance.

**Examples:**

Example 1 (javascript):
```javascript
(1..5).to_a # => [1, 2, 3, 4, 5]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/StaticFormatter.html

**Contents:**
- abstract struct Log::StaticFormatter
- Overview
- Extended Modules
- Direct Known Subclasses
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct

Base implementation of Log::Formatter to convert log entries into text representation

This can be used to create efficient formatters:

There is also a helper macro to generate these formatters. Here's an example that generates the same result:

Write the Log::Entry to the IO using this pattern

Write all the values from the context

Write all the values from the entry data

Write the exception, including backtrace

Write the message of the entry

Write the current process identifier

Write the program name.

Subclasses must implement this method to define the output pattern

Write the source for non-root entries

Write the entry timestamp in RFC3339 format

Write the Log::Entry to the IO using this pattern

Write all the values from the context

It doesn't write any output if the context is empty. Parameters before and after can be provided to be written around the value.

Write all the values from the entry data

It doesn't write any output if the entry data is empty. Parameters before and after can be provided to be written around the value.

Write the exception, including backtrace

It doesn't write any output unless there is an exception in the entry. Parameters before and after can be provided to be written around the value. before defaults to '\n' so the exception is written on a separate line

Write the message of the entry

Write the current process identifier

Write the program name. See Log.progname.

Subclasses must implement this method to define the output pattern

This writes the severity in uppercase and left padded with enough space so all the severities fit

Write the source for non-root entries

It doesn't write any output for entries generated from the root logger. Parameters before and after can be provided to be written around the value.

Write the entry timestamp in RFC3339 format

**Examples:**

Example 1 (julia):
```julia
require "log"

struct MyFormat < Log::StaticFormatter
  def run
    string "- "
    severity
    string ": "
    message
  end
end

Log.setup(:info, Log::IOBackend.new(formatter: MyFormat))
Log.info { "Hello" }    # => -   INFO: Hello
Log.error { "Oh, no!" } # => -  ERROR: Oh, no!
```

Example 2 (unknown):
```unknown
Log.define_formatter MyFormat, "- #{severity}: #{message}"
```

Example 3 (vue):
```vue
Log.define_formatter TestFormatter, "#{source(before: '[', after: "] ")}#{message}"
Log.setup(:info, Log::IOBackend.new(formatter: TestFormatter))
Log.for("foo.bar").info { "Hello" } # => - [foo.bar] Hello
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/FunctionPassManager/Runner.html

**Contents:**
- struct LLVM::FunctionPassManager::Runner
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

DEPRECATED The legacy pass manager was removed in LLVM 17. Use LLVM::PassBuilderOptions instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/LLVM/ABI/ArgType.html

**Contents:**
- struct LLVM::ABI::ArgType
- Overview
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

DEPRECATED This API is now internal to the compiler and no longer updated publicly.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Enumerable/Chunk/Alone.html

**Contents:**
- struct Enumerable::Chunk::Alone
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

Can be used in Enumerable#chunks and specifies that the element should be chunked by itself.

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/HTTP.html

**Contents:**
- module HTTP
- Overview
- Defined in:
- Constant Summary
- Class Method Summary
- Class Method Detail

The HTTP module contains HTTP::Client, HTTP::Server and HTTP::WebSocket implementations.

NOTE To use HTTP, you must explicitly import it with require "http"

Default maximum permitted combined size (in bytes) of the headers in an HTTP request.

Default maximum permitted size (in bytes) of the request line in an HTTP request.

Dequotes an RFC 2616 quoted-string.

Format a Time object as a String using the format specified as sane-cookie-date by RFC 6265 which is according to RFC 2616 a RFC 1123 format with explicit timezone GMT (interpreted as UTC).

Parse a time string using the formats specified by RFC 2616

Encodes a string to an RFC 2616 quoted-string.

Encodes a string to an RFC 2616 quoted-string.

DEPRECATED Use HTTP::Headers#serialize instead.

Dequotes an RFC 2616 quoted-string.

Format a Time object as a String using the format specified as sane-cookie-date by RFC 6265 which is according to RFC 2616 a RFC 1123 format with explicit timezone GMT (interpreted as UTC).

Uses Time::Format::HTTP_DATE as formatter.

Parse a time string using the formats specified by RFC 2616

Uses Time::Format::HTTP_DATE as parser.

Encodes a string to an RFC 2616 quoted-string. Encoded string is written to io. May raise when string contains an invalid character.

Encodes a string to an RFC 2616 quoted-string. May raise when string contains an invalid character.

DEPRECATED Use HTTP::Headers#serialize instead.

**Examples:**

Example 1 (javascript):
```javascript
require "http"

quoted = %q(\"foo\\bar\")
HTTP.dequote_string(quoted) # => %q("foo\bar")
```

Example 2 (javascript):
```javascript
require "http"

HTTP.format_time(Time.utc(2016, 2, 15)) # => "Mon, 15 Feb 2016 00:00:00 GMT"
```

Example 3 (javascript):
```javascript
require "http"

HTTP.parse_time("Sun, 14 Feb 2016 21:00:00 GMT")  # => "2016-02-14 21:00:00Z"
HTTP.parse_time("Sunday, 14-Feb-16 21:00:00 GMT") # => "2016-02-14 21:00:00Z"
HTTP.parse_time("Sun Feb 14 21:00:00 2016")       # => "2016-02-14 21:00:00Z"
```

Example 4 (javascript):
```javascript
require "http"

string = %q("foo\ bar")
io = IO::Memory.new
HTTP.quote_string(string, io)
io.rewind
io.gets_to_end # => %q(\"foo\\\ bar\")
```

---

## enum¶

**URL:** https://crystal-lang.org/reference/1.18/syntax_and_semantics/c_bindings/enum.html

**Contents:**
- enum¶

An enum declaration inside a lib declares a C enum:

As in C, the first member of the enum has a value of zero and each successive value is incremented by one.

You can specify the value of a member:

As you can see, some basic math is allowed for a member value: +, -, *, /, &, |, <<, >> and %.

The type of an enum member is Int32 by default. It's an error to specify a different type in a constant value.

However, you can change this default type:

You can use an enum as a type in a fun parameter or struct or union members:

**Examples:**

Example 1 (typescript):
```typescript
lib X
  # In C:
  #
  #  enum SomeEnum {
  #    Zero,
  #    One,
  #    Two,
  #    Three,
  #  };
  enum SomeEnum
    Zero
    One
    Two
    Three
  end
end
```

Example 2 (yaml):
```yaml
X::SomeEnum::One # => One
```

Example 3 (julia):
```julia
lib X
  enum SomeEnum
    Ten       = 10
    Twenty    = 10 * 2
    ThirtyTwo = 1 << 5
  end
end
```

Example 4 (julia):
```julia
lib X
  enum SomeEnum
    A = 1_u32 # Error: enum value must be an Int32
  end
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/IO/Buffered.html

**Contents:**
- module IO::Buffered
- Overview
- Direct including types
- Defined in:
- Instance Method Summary
- Instance Method Detail

The IO::Buffered mixin enhances an IO with input/output buffering.

The buffering behaviour can be turned on/off with the #sync= and #read_buffering= methods.

Additionally, several methods, like #gets, are implemented in a more efficient way.

Return the buffer size used

Set the buffer size of both the read and write buffer Cannot be changed after any of the buffers have been allocated

Flushes and closes the underlying IO.

Flushes any buffered data and the underlying IO.

Turns on/off flushing the underlying IO when a newline is written.

Determines if this IO flushes automatically when a newline is written.

Returns the bytes hold in the read buffer.

Returns the current position (in bytes) in this IO.

Buffered implementation of IO#read(slice).

Turns on/off IO read buffering.

Determines whether this IO buffers reads.

Rewinds the underlying IO.

Turns on/off IO write buffering.

Determines if this IO does write buffering.

Closes the wrapped IO.

Flushes the wrapped IO.

Reads at most slice.size bytes from the wrapped IO into slice.

Rewinds the wrapped IO.

Writes slice entirely into the wrapped IO.

Buffered implementation of IO#write(slice).

Return the buffer size used

Set the buffer size of both the read and write buffer Cannot be changed after any of the buffers have been allocated

Flushes and closes the underlying IO.

Flushes any buffered data and the underlying IO. Returns self.

Turns on/off flushing the underlying IO when a newline is written.

Determines if this IO flushes automatically when a newline is written.

Returns the bytes hold in the read buffer.

This method only performs a read to return peek data if the current buffer is empty: otherwise no read is performed and whatever is in the buffer is returned.

Returns the current position (in bytes) in this IO.

Buffered implementation of IO#read(slice).

Turns on/off IO read buffering.

Determines whether this IO buffers reads.

Rewinds the underlying IO. Returns self.

Turns on/off IO write buffering. When sync is set to true, no buffering will be done (that is, writing to this IO is immediately synced to the underlying IO).

Determines if this IO does write buffering. If true, no buffering is done.

Closes the wrapped IO.

TODO Add return type restriction Nil

Flushes the wrapped IO.

TODO Add return type restriction Nil

Reads at most slice.size bytes from the wrapped IO into slice. Returns the number of bytes read.

TODO Add return type restriction Int32

Rewinds the wrapped IO.

TODO Add return type restriction Nil

Writes slice entirely into the wrapped IO.

TODO Add return type restriction Nil

Buffered implementation of IO#write(slice).

**Examples:**

Example 1 (javascript):
```javascript
File.write("testfile", "hello")

file = File.new("testfile")
file.pos     # => 0
file.gets(2) # => "he"
file.pos     # => 2
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Log/ShortFormat.html

**Contents:**
- struct Log::ShortFormat
- Defined in:
- Instance Method Summary
  - Instance methods inherited from struct Log::StaticFormatter
  - Constructor methods inherited from struct Log::StaticFormatter
  - Class methods inherited from struct Log::StaticFormatter
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object

Subclasses must implement this method to define the output pattern

Subclasses must implement this method to define the output pattern

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/IO/ByteFormat/LittleEndian.html

**Contents:**
- module IO::ByteFormat::LittleEndian
- Extended Modules
- Defined in:
- Class Method Summary
- Class Method Detail

DEPRECATED Use .decode(int : Int8.class, io : IO) instead

DEPRECATED Use .decode(int : Int8.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt8.class, io : IO) instead

DEPRECATED Use .decode(int : UInt8.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int16.class, io : IO) instead

DEPRECATED Use .decode(int : Int16.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt16.class, io : IO) instead

DEPRECATED Use .decode(int : UInt16.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int32.class, io : IO) instead

DEPRECATED Use .decode(int : Int32.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt32.class, io : IO) instead

DEPRECATED Use .decode(int : UInt32.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int64.class, io : IO) instead

DEPRECATED Use .decode(int : Int64.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt64.class, io : IO) instead

DEPRECATED Use .decode(int : UInt64.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int128.class, io : IO) instead

DEPRECATED Use .decode(int : Int128.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt128.class, io : IO) instead

DEPRECATED Use .decode(int : UInt128.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int8.class, io : IO) instead

DEPRECATED Use .decode(int : Int8.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt8.class, io : IO) instead

DEPRECATED Use .decode(int : UInt8.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int16.class, io : IO) instead

DEPRECATED Use .decode(int : Int16.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt16.class, io : IO) instead

DEPRECATED Use .decode(int : UInt16.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int32.class, io : IO) instead

DEPRECATED Use .decode(int : Int32.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt32.class, io : IO) instead

DEPRECATED Use .decode(int : UInt32.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int64.class, io : IO) instead

DEPRECATED Use .decode(int : Int64.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt64.class, io : IO) instead

DEPRECATED Use .decode(int : UInt64.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : Int128.class, io : IO) instead

DEPRECATED Use .decode(int : Int128.class, bytes : Bytes) instead

DEPRECATED Use .decode(int : UInt128.class, io : IO) instead

DEPRECATED Use .decode(int : UInt128.class, bytes : Bytes) instead

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Compress/Zip/Writer.html

**Contents:**
- class Compress::Zip::Writer
- Overview
  - Example
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference

Writes (streams) zip entries to an IO.

Creates a new writer to the given io.

Creates a new writer to the given filename.

Creates a new writer to the given io, yields it to the given block, and closes it at the end.

Creates a new writer to the given filename, yields it to the given block, and closes it at the end.

Adds an entry that will have the given filename and current time (Time.utc) and yields an IO to write that entry's contents.

Adds an entry and yields IO to write that entry's contents.

Adds an entry that will have string as its contents.

Adds an entry that will have bytes as its contents.

Adds an entry that will have its data copied from the given data.

Adds a directory entry that will have the given name.

Closes this zip writer.

Returns true if this writer is closed.

Sets the zip file comment

Whether to close the enclosed IO when closing this writer.

Whether to close the enclosed IO when closing this writer.

Creates a new writer to the given io.

Creates a new writer to the given filename.

Creates a new writer to the given io, yields it to the given block, and closes it at the end.

Creates a new writer to the given filename, yields it to the given block, and closes it at the end.

Adds an entry that will have the given filename and current time (Time.utc) and yields an IO to write that entry's contents.

Adds an entry and yields IO to write that entry's contents.

You can choose the Entry's compression method before adding it.

You can also set the Entry's time (which is Time.utc by default) and extra data before adding it to the zip stream.

Adds an entry that will have string as its contents.

Adds an entry that will have bytes as its contents.

Adds an entry that will have its data copied from the given data. If the given data is a ::File, it is automatically closed after data is copied from it.

Adds a directory entry that will have the given name.

Closes this zip writer.

Returns true if this writer is closed.

Sets the zip file comment

Whether to close the enclosed IO when closing this writer.

Whether to close the enclosed IO when closing this writer.

**Examples:**

Example 1 (julia):
```julia
require "compress/zip"

File.open("./file.zip", "w") do |file|
  Compress::Zip::Writer.open(file) do |zip|
    # Add a file with a String content
    zip.add "foo.txt", "contents of foo"

    # Add a file and write data to it through an IO
    zip.add("bar.txt") do |io|
      io << "contents of bar"
    end

    # Add a file by referencing a file in the filesystem
    # (the file is automatically closed after this call)
    zip.add("baz.txt", File.open("./some_file.txt"))
  end
end
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Class.html

**Contents:**
- abstract class Class
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object
- Constructor Detail

Casts other to this class.

Returns whether this class inherits or includes other.

Returns whether this class inherits or includes other, or is equal to other.

Returns whether this class is the same as other.

Returns whether other inherits or includes self.

Returns whether other inherits or includes self, or is equal to self.

Returns the union type of self and other.

Returns a shallow copy of this object.

See Object#hash(hasher)

Prints to io an unambiguous and information-rich string representation of this object, typically intended for developers.

Returns the name of this class.

Returns true if nil is an instance of this type.

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

Returns whether this class inherits or includes other.

Returns whether this class inherits or includes other, or is equal to other.

Returns whether this class is the same as other.

Returns whether other inherits or includes self.

Returns whether other inherits or includes self, or is equal to self.

Returns the union type of self and other.

Casts other to this class.

Returns a shallow copy of this object.

See Object#hash(hasher)

Prints to io an unambiguous and information-rich string representation of this object, typically intended for developers.

Returns the name of this class.

Returns true if nil is an instance of this type.

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

Casts other to this class.

This is the same as using as, but allows the class to be passed around as an argument. See the documentation on as for more information.

Returns whether this class inherits or includes other.

Returns whether this class inherits or includes other, or is equal to other.

Returns whether this class is the same as other.

The #=== method is used in a case ... when ... end expression.

For example, this code:

Is equivalent to this code:

Object simply implements #=== by invoking #==, but subclasses (notably Regex) can override it to provide meaningful case-equality semantics.

Returns whether other inherits or includes self.

Returns whether other inherits or includes self, or is equal to self.

Returns the union type of self and other.

Returns a shallow copy of this object.

Because Value is a value type, this method returns self, which already involves a shallow copy of this object because value types are passed by value.

See Object#hash(hasher)

Prints to io an unambiguous and information-rich string representation of this object, typically intended for developers.

It is similar to #to_s(IO), but often provides more information. Ideally, it should contain sufficient information to be able to recreate an object with the same value (given an identical environment).

For types that don't provide a custom implementation of this method, default implementation delegates to #to_s(IO). This said, it is advisable to have an appropriate #inspect implementation on every type. Default implementations are provided by Struct#inspect and Reference#inspect.

::p and ::p! use this method to print an object in STDOUT.

Returns the name of this class.

Returns true if nil is an instance of this type.

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

This method is called when an object is interpolated in a string literal:

IO#<< calls this method to append an object to itself:

Thus implementations must not interpolate self in a string literal or call io << self which both would lead to an endless loop.

Also see #inspect(IO).

Returns whether this class inherits or includes other.

Returns whether this class inherits or includes other, or is equal to other.

Returns whether this class is the same as other.

The #=== method is used in a case ... when ... end expression.

For example, this code:

Is equivalent to this code:

Object simply implements #=== by invoking #==, but subclasses (notably Regex) can override it to provide meaningful case-equality semantics.

Returns whether other inherits or includes self.

Returns whether other inherits or includes self, or is equal to self.

Returns the union type of self and other.

Casts other to this class.

This is the same as using as, but allows the class to be passed around as an argument. See the documentation on as for more information.

Returns a shallow copy of this object.

Because Value is a value type, this method returns self, which already involves a shallow copy of this object because value types are passed by value.

See Object#hash(hasher)

Prints to io an unambiguous and information-rich string representation of this object, typically intended for developers.

It is similar to #to_s(IO), but often provides more information. Ideally, it should contain sufficient information to be able to recreate an object with the same value (given an identical environment).

For types that don't provide a custom implementation of this method, default implementation delegates to #to_s(IO). This said, it is advisable to have an appropriate #inspect implementation on every type. Default implementations are provided by Struct#inspect and Reference#inspect.

::p and ::p! use this method to print an object in STDOUT.

Returns the name of this class.

Returns true if nil is an instance of this type.

Prints a nicely readable and concise string representation of this object, typically intended for users, to io.

This method is called when an object is interpolated in a string literal:

IO#<< calls this method to append an object to itself:

Thus implementations must not interpolate self in a string literal or call io << self which both would lead to an endless loop.

Also see #inspect(IO).

**Examples:**

Example 1 (javascript):
```javascript
klass = Int32
number = [99, "str"][0]
typeof(number)             # => (String | Int32)
typeof(klass.cast(number)) # => Int32
```

Example 2 (javascript):
```javascript
Int32 < Number  # => true
Int32 < Value   # => true
Int32 < Int32   # => false
Int32 <= String # => false
```

Example 3 (javascript):
```javascript
Int32 < Number  # => true
Int32 < Value   # => true
Int32 <= Int32  # => true
Int32 <= String # => false
```

Example 4 (javascript):
```javascript
Int32 == Int32  # => true
Int32 == String # => false
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Path.html

**Contents:**
- struct Path
- Overview
- Examples
- Included Modules
- Defined in:
- Constant Summary
- Constructors
- Instance Method Summary
  - Instance methods inherited from module Comparable(Path)
  - Instance methods inherited from struct Struct

A Path represents a filesystem path and allows path-handling operations such as querying its components as well as semantic manipulations.

A path is hierarchical and composed of a sequence of directory and file name elements separated by a special separator or delimiter. A root component, that identifies a file system hierarchy, may also be present. The name element that is farthest from the root of the directory hierarchy is the name of a file or directory. The other name elements are directory names. A Path can represent a root, a root and a sequence of names, or simply one or more name elements. A Path is considered to be an empty path if it consists solely of one name element that is empty or equal to ".". Accessing a file using an empty path is equivalent to accessing the default directory of the process.

For now, its methods are purely lexical, there is no direct filesystem access.

Path handling comes in different kinds depending on operating system:

The main differences between Windows and POSIX paths:

The file/directory separator characters of the current platform. {'/'} on POSIX, {'\\', '/'} on Windows.

Creates a new Path of native kind.

Creates a new Path of native kind.

Returns the path of the home directory of the current user.

Creates a new Path of native kind.

Creates a new Path of native kind.

Creates a new Path of native kind.

Creates a new Path of native kind.

Creates a new Path of POSIX kind.

Creates a new Path of POSIX kind.

Creates a new Path of POSIX kind.

Creates a new Path of POSIX kind.

Creates a new Path of Windows kind.

Creates a new Path of Windows kind.

Creates a new Path of Windows kind.

Creates a new Path of Windows kind.

Appends the given part to this path and returns the joined path.

Compares this path to other.

Returns true if this path is considered equivalent to other.

Returns true if this path is absolute.

Returns the concatenation of #drive and #root.

Returns the last component of this path.

Returns all components of this path except the last one.

Returns a path representing the drive component or nil if this path does not contain a drive.

Returns a tuple of #drive and #root as strings.

Yields each parent of this path beginning with the topmost parent.

Yields each component of this path as a String.

Returns an iterator over all components of this path.

Converts this path to an absolute path.

Returns the extension of this path, or an empty string if it has no extension.

See Object#hash(hasher)

Inspects this path to io.

Appends the given parts to this path and returns the joined path.

Appends the given part to this path and returns the joined path.

Appends the given parts to this path and returns the joined path.

Returns true if this is a native path for the target platform.

Removes redundant elements from this path and returns the shortest equivalent path by purely lexical processing.

Returns the parent path of this path.

Returns all parent paths of this path beginning with the topmost path.

Returns the components of this path as an Array(String).

Returns true if this is a POSIX path.

Same as #relative_to but returns self if self can't be expressed as relative path to base.

Returns a relative path that is lexically equivalent to self when joined to base with an intervening separator.

Returns a relative path that is lexically equivalent to self when joined to base with an intervening separator.

Returns the root path component of this path or nil if it is not rooted.

Resolves path name in this path's parent directory.

Returns the last component of this path without the extension.

Converts this path to the given kind.

Converts this path to a native path.

Converts this path to a POSIX path.

Appends the string representation of this path to io.

Returns the string representation of this path.

Returns a new URI with file scheme from this path.

Converts this path to a Windows path.

Returns true if this is a Windows path.

Creates a new Path of native kind.

When compiling for a windows target, this is equal to Path.windows(), otherwise Path.posix is used.

Creates a new Path of native kind.

When compiling for a windows target, this is equal to Path.windows(), otherwise Path.posix is used.

Returns the path of the home directory of the current user.

Creates a new Path of native kind.

When compiling for a windows target, this is equal to Path.windows(), otherwise Path.posix is used.

Creates a new Path of native kind.

When compiling for a windows target, this is equal to Path.windows(), otherwise Path.posix is used.

Creates a new Path of native kind.

When compiling for a windows target, this is equal to Path.windows(), otherwise Path.posix is used.

Creates a new Path of native kind.

When compiling for a windows target, this is equal to Path.windows(), otherwise Path.posix is used.

Creates a new Path of POSIX kind.

Creates a new Path of POSIX kind.

Creates a new Path of POSIX kind.

Creates a new Path of POSIX kind.

Creates a new Path of Windows kind.

Creates a new Path of Windows kind.

Creates a new Path of Windows kind.

Creates a new Path of Windows kind.

Appends the given part to this path and returns the joined path.

See #join(part) for details.

Compares this path to other.

The comparison is performed strictly lexically: foo and ./foo are not treated as equal. Nor are paths of different kind. To compare paths semantically, they need to be normalized and converted to the same kind.

Comparison is case-sensitive for POSIX paths and case-insensitive for Windows paths.

Returns true if this path is considered equivalent to other.

The comparison is performed strictly lexically: foo and ./foo are not treated as equal. Nor are paths of different kind. To compare paths semantically, they need to be normalized and converted to the same kind.

Comparison is case-sensitive for POSIX paths and case-insensitive for Windows paths.

Returns true if this path is absolute.

A POSIX path is absolute if it begins with a forward slash (#/).

A Windows path is absolute if it begins with a drive letter (C:), a UNC share (\\server\share), or a root local device path (\\., \\?), which is then followed by a root path separator. Drive-relative paths (C:foo), rooted paths (\foo), and root local device paths (\\.) are not absolute.

Returns the concatenation of #drive and #root.

Returns the last component of this path.

If suffix is given, it is stripped from the end.

In case the last component is the empty string (i.e. the path has a trailing separator), the second to last component is returned. For a path that only consists of an anchor, or an empty path, the base name is equivalent to the full path.

Returns all components of this path except the last one.

Returns a path representing the drive component or nil if this path does not contain a drive.

See #anchor for the combination of drive and #root.

NOTE Drives are only available for Windows paths. It can be a drive letter (C:), a UNC share (\\host\share), or a root local device path (\\., \\?).

Returns a tuple of #drive and #root as strings.

Yields each parent of this path beginning with the topmost parent.

Yields each component of this path as a String.

See #parts for more examples.

Returns an iterator over all components of this path.

See #parts for more examples.

Converts this path to an absolute path. Relative paths are referenced from the current working directory of the process (Dir.current) unless base is given, in which case it will be used as the reference path.

home specifies the home directory which ~ will expand to. "~" is expanded to the value passed to home. If it is false (default), home is not expanded. If true, it is expanded to the user's home directory (Path.home).

If expand_base is true, base itself will be expanded in Dir.current if it is not an absolute path. This guarantees the method returns an absolute path (assuming that Dir.current is absolute).

Returns the extension of this path, or an empty string if it has no extension.

See Object#hash(hasher)

Inspects this path to io.

Appends the given parts to this path and returns the joined path.

Non-matching paths are implicitly converted to this path's kind.

See #join(part) for details.

Appends the given part to this path and returns the joined path.

Joining an empty string ("") appends a trailing path separator. In case the path already ends with a trailing separator, no additional separator is added.

Appends the given parts to this path and returns the joined path.

See #join(part) for details.

Returns true if this is a native path for the target platform.

Removes redundant elements from this path and returns the shortest equivalent path by purely lexical processing. It applies the following rules iteratively until no further processing can be done:

If the path turns to be empty, the current directory (".") is returned.

The returned path ends in a slash if it is the root ("/", \, or C:\), or if this path is a Windows local device path that also ends in a slash. This trailing slash is significant; \\.\C: refers to the volume C:, on which most I/O functions fail, whereas \\.\C:\ refers to the root directory of said volume.

See also Rob Pike: Lexical File Names in Plan 9 or Getting Dot-Dot Right

Returns the parent path of this path.

If the path is empty, it returns ".". If the path is rooted and in the top-most hierarchy, the root path is returned.

Returns all parent paths of this path beginning with the topmost path.

Returns the components of this path as an Array(String).

Returns true if this is a POSIX path.

Same as #relative_to but returns self if self can't be expressed as relative path to base.

Returns a relative path that is lexically equivalent to self when joined to base with an intervening separator.

The returned path is in normalized form.

That means with normalized paths base.join(target.relative_to(base)) is equivalent to target.

Returns nil if self cannot be expressed as relative to base or if knowing the current working directory would be necessary to resolve it. The latter can be avoided by expanding the paths first.

For Windows paths, the drive and the root must be identical; relative paths between different path types are not supported, even if they would resolve to the same roots (e.g. \\.\C:\foo and C:\foo are not equivalent, nor are \\?\UNC\server\share\foo and \\server\share\foo).

Returns a relative path that is lexically equivalent to self when joined to base with an intervening separator.

The returned path is in normalized form.

That means with normalized paths base.join(target.relative_to(base)) is equivalent to target.

Returns nil if self cannot be expressed as relative to base or if knowing the current working directory would be necessary to resolve it. The latter can be avoided by expanding the paths first.

For Windows paths, the drive and the root must be identical; relative paths between different path types are not supported, even if they would resolve to the same roots (e.g. \\.\C:\foo and C:\foo are not equivalent, nor are \\?\UNC\server\share\foo and \\server\share\foo).

Returns the root path component of this path or nil if it is not rooted.

See #anchor for the combination of #drive and root.

Resolves path name in this path's parent directory.

Raises Path::Error if #parent is nil.

Returns the last component of this path without the extension.

This is equivalent to self.basename(self.extension).

Converts this path to the given kind.

See #to_windows and #to_posix for details.

Converts this path to a native path.

Converts this path to a POSIX path.

It returns a new instance with Kind::POSIX and all occurrences of Windows' backslash file separators (\\) replaced by forward slash (#/). If #posix? is true, this is a no-op.

When mappings is true (default), replacements for forbidden characters in Windows paths are substituted by the original characters when converting to a POSIX path. Originals are calculated by subtracting 0xF000 from the replacement codepoint. For example, the U+F05C becomes U+005C, the backslash character.

Appends the string representation of this path to io.

Returns the string representation of this path.

Returns a new URI with file scheme from this path.

A URI can only be created with an absolute path. Raises Path::Error if this path is not absolute.

Converts this path to a Windows path.

This creates a new instance with the same string representation but with Kind::WINDOWS. If #windows? is true, this is a no-op.

When mappings is true (default), forbidden characters in Windows paths are substituted by replacement characters when converting from a POSIX path. Replacements are calculated by adding 0xF000 to their codepoint. For example, the backslash character U+005C becomes U+F05C.

Returns true if this is a Windows path.

**Examples:**

Example 1 (javascript):
```javascript
Path["foo/bar/baz.cr"].parent    # => Path["foo/bar"]
Path["foo/bar/baz.cr"].basename  # => "baz.cr"
Path["./foo/../bar"].normalize   # => Path["bar"]
Path["~/bin"].expand(home: true) # => Path["/home/crystal/bin"]
```

Example 2 (markdown):
```markdown
# On POSIX system:
Path.new("foo", "bar", "baz.cr") == Path.posix("foo/bar/baz.cr")
# On Windows system:
Path.new("foo", "bar", "baz.cr") == Path.windows("foo\\bar\\baz.cr")
```

Example 3 (javascript):
```javascript
Path.posix("/foo/./bar").normalize   # => Path.posix("/foo/bar")
Path.windows("/foo/./bar").normalize # => Path.windows("\\foo\\bar")

Path.posix("/foo").absolute?   # => true
Path.windows("/foo").absolute? # => false

Path.posix("foo") == Path.posix("FOO")     # => false
Path.windows("foo") == Path.windows("FOO") # => true
```

Example 4 (javascript):
```javascript
Path["foo"] / "bar" / "baz"     # => Path["foo/bar/baz"]
Path["foo/"] / Path["/bar/baz"] # => Path["foo/bar/baz"]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/TCPSocket.html

**Contents:**
- class TCPSocket
- Overview
- Direct Known Subclasses
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from class IPSocket
  - Instance methods inherited from class Socket
  - Constructor methods inherited from class Socket

A Transmission Control Protocol (TCP/IP) socket.

NOTE To use TCPSocket, you must explicitly import it with require "socket"

Creates a new TCPSocket, waiting to be connected.

DEPRECATED parameter blocking Use Socket.set_blocking instead.

Creates a new TCP connection to a remote TCP server.

DEPRECATED parameter blocking Use Socket.set_blocking instead.

Creates an UNIXSocket from an existing system file descriptor or socket handle.

DEPRECATED parameter blocking Use Socket.set_blocking instead.

Opens a TCP socket to a remote TCP server, yields it to the block, then eventually closes the socket when the block returns.

The number of probes sent, without response before dropping the connection.

The amount of time in seconds the connection must be idle before sending keepalive probes.

The amount of time in seconds between keepalive probes.

Disables the Nagle algorithm when set to true, otherwise enables it.

Returns true if the Nagle algorithm is disabled.

Creates a new TCPSocket, waiting to be connected.

DEPRECATED parameter blocking Use Socket.set_blocking instead.

Creates a new TCP connection to a remote TCP server.

You may limit the DNS resolution time with dns_timeout and limit the connection time to the remote server with connect_timeout. Both values must be in seconds (integers or floats).

DEPRECATED parameter blocking Use Socket.set_blocking instead.

Creates an UNIXSocket from an existing system file descriptor or socket handle.

This adopts fd into the IO system that will reconfigure it as per the event loop runtime requirements.

NOTE On Windows, the handle must have been created with WSA_FLAG_OVERLAPPED.

DEPRECATED parameter blocking Use Socket.set_blocking instead.

Opens a TCP socket to a remote TCP server, yields it to the block, then eventually closes the socket when the block returns.

Returns the value of the block.

The number of probes sent, without response before dropping the connection.

The amount of time in seconds the connection must be idle before sending keepalive probes.

The amount of time in seconds between keepalive probes.

Disables the Nagle algorithm when set to true, otherwise enables it.

Returns true if the Nagle algorithm is disabled.

**Examples:**

Example 1 (unknown):
```unknown
require "socket"

client = TCPSocket.new("localhost", 1234)
client << "message\n"
response = client.gets
client.close
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Benchmark/BM/Tms.html

**Contents:**
- class Benchmark::BM::Tms
- Overview
- Defined in:
- Instance Method Summary
  - Instance methods inherited from class Reference
  - Constructor methods inherited from class Reference
  - Class methods inherited from class Reference
  - Instance methods inherited from class Object
  - Class methods inherited from class Object
  - Macros inherited from class Object

A data object, representing the times associated with a benchmark measurement.

System CPU time of children

User CPU time of children

The label associated with this measure

Prints #utime, #stime, #total and #real to io.

Total time, that is #utime + #stime + #cutime + #cstime

System CPU time of children

User CPU time of children

The label associated with this measure

Prints #utime, #stime, #total and #real to io.

Total time, that is #utime + #stime + #cutime + #cstime

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time/Location.html

**Contents:**
- class Time::Location
- Overview
  - Fixed Offset
  - Local Time Zone
- Direct Known Subclasses
- Defined in:
- Constant Summary
- Constructors
- Class Method Summary
- Instance Method Summary

Location maps time instants to the zone in use at that time. It typically represents the collection of time offsets observed in a certain geographical area.

It contains a list of zone offsets and rules for transitioning between them.

If a location has only one offset (such as UTC) it is considered fixed.

A Location instance is usually retrieved by name using Time::Location.load. It loads the zone offsets and transitioning rules from the time zone database provided by the operating system.

A custom time zone database can be configured through the environment variable ZONEINFO. See .load for details.

A fixed offset location is created using Time::Location.fixed:

The local time zone can be accessed as Time::Location.local.

It is initially configured according to system environment settings, but its value can be changed:

Describes the Coordinated Universal Time (UTC).

The only time zone offset in this location is Zone::UTC.

Creates a Location instance named name with fixed offset in seconds from UTC.

Creates a Location instance with fixed offset in seconds from UTC.

Loads the Location with the given name.

Loads the local time zone according to the current application environment.

Returns the Location representing the application's local time zone.

Loads the Location with the given name.

Returns the Location representing the application's local time zone.

Creates a Location instance named name with the given POSIX TZ string str, as defined in POSIX.1-2024 Section 8.3.

Returns true if other is equal to self.

Returns true if this location has a fixed offset.

Returns true if other is equal to self.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Returns true if this location equals to Time::Location.local.

Returns the time zone offset observed at time.

Returns the time zone offset observed at unix_seconds.

Returns the name of this location.

Returns true if this location equals to UTC.

Returns the array of time zone offsets (Zone) used in this time zone.

Creates a Location instance named name with fixed offset in seconds from UTC.

Creates a Location instance with fixed offset in seconds from UTC.

The formatted offset is used as name.

Loads the Location with the given name.

name is understood to be a location name in the IANA Time Zone database, such as "America/New_York". As special cases, "UTC", "Etc/UTC" and empty string ("") return Location::UTC, and "Local" returns Location.local.

The implementation uses a list of system-specific paths to look for a time zone database. The first time zone database entry matching the given name that is successfully loaded and parsed is returned. Typical paths on Unix-based operating systems are /usr/share/zoneinfo/, /usr/share/lib/zoneinfo/, or /usr/lib/locale/TZ/.

A time zone database may not be present on all systems, especially non-Unix systems. In this case, you may need to distribute a copy of the database with an application that depends on time zone data being available.

A custom lookup path can be set as environment variable ZONEINFO. The path can point to the root of a directory structure or an uncompressed ZIP file, each representing the time zone database using files and folders of the expected names.

If the location name cannot be found, InvalidLocationNameError is raised. If the loader encounters a format error in the time zone database, InvalidTZDataError is raised.

Files are cached based on the modification time, so subsequent request for the same location name will most likely return the same instance of Location, unless the time zone database has been updated in between.

Loads the local time zone according to the current application environment.

The environment variable ENV["TZ"] is consulted for finding the time zone to use.

Returns the Location representing the application's local time zone.

Time uses this property as default value for most method arguments expecting a Location.

The initial value depends on the current application environment, see .load_local for details.

The value can be changed to overwrite the system default:

Loads the Location with the given name.

name is understood to be a location name in the IANA Time Zone database, such as "America/New_York". As special cases, "UTC", "Etc/UTC" and empty string ("") return Location::UTC, and "Local" returns Location.local.

The implementation uses a list of system-specific paths to look for a time zone database. The first time zone database entry matching the given name that is successfully loaded and parsed is returned. Typical paths on Unix-based operating systems are /usr/share/zoneinfo/, /usr/share/lib/zoneinfo/, or /usr/lib/locale/TZ/.

A time zone database may not be present on all systems, especially non-Unix systems. In this case, you may need to distribute a copy of the database with an application that depends on time zone data being available.

A custom lookup path can be set as environment variable ZONEINFO. The path can point to the root of a directory structure or an uncompressed ZIP file, each representing the time zone database using files and folders of the expected names.

If the location name cannot be found, InvalidLocationNameError is raised. If the loader encounters a format error in the time zone database, InvalidTZDataError is raised.

Files are cached based on the modification time, so subsequent request for the same location name will most likely return the same instance of Location, unless the time zone database has been updated in between.

Returns nil if the location is unavailable. Raises InvalidLocationNameError if the name is invalid. Raises InvalidTZDataError if the loader encounters a format error in the time zone database.

Returns the Location representing the application's local time zone.

Time uses this property as default value for most method arguments expecting a Location.

The initial value depends on the current application environment, see .load_local for details.

The value can be changed to overwrite the system default:

Creates a Location instance named name with the given POSIX TZ string str, as defined in POSIX.1-2024 Section 8.3.

str must begin with a standard time designator followed by a time offset; implementation-defined TZ strings beginning with a colon, as well as names from the time zone database, are not supported.

If str designates a daylight saving time, then the transition times must also be present. A TZ string like "PST8PDT" alone is considered invalid, since no default transition rules are assumed.

Returns true if other is equal to self.

Two Location instances are considered equal if they have the same name, offset zones and transition rules.

Returns true if this location has a fixed offset.

Locations returned by Location.posix_tz have a fixed offset if the TZ string specifies either no daylight saving time at all, or an all-year daylight saving time (e.g. "EST5EDT,0/0,J365/25").

Returns true if other is equal to self.

Two Location instances are considered equal if they have the same name, offset zones and transition rules.

Appends a String representation of this object which includes its class name, its object address and the values of all instance variables.

Returns true if this location equals to Time::Location.local.

Returns the time zone offset observed at time.

Returns the time zone offset observed at unix_seconds.

unix_seconds expresses the number of seconds since UNIX epoch (1970-01-01 00:00:00Z).

Returns the name of this location.

It usually consists of a continent and city name separated by a slash, for example Europe/Berlin.

Returns true if this location equals to UTC.

Returns the array of time zone offsets (Zone) used in this time zone.

**Examples:**

Example 1 (javascript):
```javascript
location = Time::Location.load("Europe/Berlin")
location # => #<Time::Location Europe/Berlin>
time = Time.local(2016, 2, 15, 21, 1, 10, location: location)
time # => 2016-02-15 21:01:10+01:00[Europe/Berlin]
```

Example 2 (javascript):
```javascript
location = Time::Location.fixed(3600)
location       # => #<Time::Location +01:00>
location.zones # => [#<Time::Location::Zone +01:00 (0s) STD>]
```

Example 3 (yaml):
```yaml
location = Time::Location.local
Time::Location.local = Time::Location.load("America/New_York")
```

Example 4 (julia):
```julia
location = Time::Location.load("Europe/Berlin")
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Time.html

**Contents:**
- struct Time
- Overview
  - Telling the Time
  - Creating a Specific Instant
  - Retrieving Time Information
  - Time Zones
  - Formatting and Parsing Time
  - Calculations
- Measuring Time
- Included Modules

Time represents a date-time instant in incremental time observed in a specific time zone.

The calendaric calculations are based on the rules of the proleptic Gregorian calendar as specified in ISO 8601. Leap seconds are ignored.

Internally, the time is stored as an Int64 representing seconds from epoch (0001-01-01 00:00:00Z) and an Int32 representing nanosecond-of-second with value range 0..999_999_999.

The supported date range is 0001-01-01 00:00:00.0 to 9999-12-31 23:59:59.999_999_999 in any local time zone.

There are several methods to retrieve a Time instance representing the current time:

It is generally recommended to keep instances in UTC and only apply a local time zone when formatting for user display, unless the domain logic requires having a specific time zone (for example for calendaric operations).

Time instances representing a specific instant can be created by .utc or .new with the date-time specified as individual arguments:

Each Time instance allows querying calendar data:

For querying if a time is at a specific day of week, Time offers named predicate methods, delegating to #day_of_week:

Each time is attached to a specific time zone, represented by a Location (see #location). #zone returns the time zone observed in this location at the current time (i.e. the instant represented by this Time). #offset returns the offset of the current zone in seconds.

Using .utc, the location is Time::Location::UTC:

A Time instance can be transformed to a different time zone while retaining the same instant using #in:

Both Time instances show a different local date-time, but they represent the same date-time in the instant time-line, therefore they are considered equal:

There are also two special methods for converting to UTC and local time zone:

#to_local_in allows changing the time zone while keeping the same local date-time (wall clock) which results in a different instant on the time line.

To make date-time instances exchangeable between different computer systems or readable to humans, they are usually converted to and from a string representation.

The method #to_s formats the date-time according to a specified pattern.

Similarly, Time.parse and Time.parse! are used to construct a Time instance from date-time information in a string, according to a specified pattern:

See Time::Format for all directives.

The typical time representation provided by the operating system is based on a "wall clock" which is subject to changes for clock synchronization. This can result in discontinuous jumps in the time-line making it not suitable for accurately measuring elapsed time.

Instances of Time are focused on telling time – using a "wall clock". When Time.local is called multiple times, the difference between the returned instances is not guaranteed to equal to the time elapsed between making the calls; even the order of the returned Time instances might not reflect invocation order.

The resulting Time::Span could be anything, even negative, if the computer's wall clock has changed between both calls.

As an alternative, the operating system also provides a monotonic clock. Its time-line has no specified starting point but is strictly linearly increasing.

This monotonic clock should always be used for measuring elapsed time.

A reading from this clock can be taken using .monotonic:

The execution time of a block can be measured using .measure:

This constant is defined as 1970-01-01 00:00:00Z". Can be used to create a Time::Span that represents an Unix Epoch time duration.

Creates a new Time instance representing the given local date-time in location (defaults to local time zone).

Creates a new Time instance representing the current time from the system clock observed in location (defaults to local time zone).

Creates an instance representing the week-th day_of_week in the given year and month.

Reads a string from JSON parser as a time formatted according to RFC 3339 or other variations of ISO 8601.

Creates a new Time instance that corresponds to the number of seconds and nanoseconds elapsed from epoch (0001-01-01 00:00:00.0) observed in location.

Parses a Time from time string using the given pattern.

Parses a Time from time string using the given pattern.

Parses a Time from time string using the given pattern and Time::Location.local as default location

Parse time format specified by RFC 2822.

Parse time format specified by RFC 3339 (ISO 8601 profile).

Parses a Time from time string using the given pattern and Time::Location::UTC as default location.

Creates a new Time instance that corresponds to the number of seconds elapsed since the Unix epoch (1970-01-01 00:00:00Z).

Creates a new Time instance that corresponds to the number of milliseconds elapsed since the Unix epoch (1970-01-01 00:00:00Z).

Creates a new Time instance that corresponds to the number of nanoseconds elapsed since the Unix epoch (1970-01-01 00:00:00Z).

Creates a new Time instance representing the given date-time in UTC.

Creates a new Time instance representing the current time from the system clock in UTC.

Creates a new Time instance that corresponds to the number of seconds and nanoseconds elapsed from epoch (0001-01-01 00:00:00Z) in UTC.

Creates an instance specified by a commercial week date consisting of ISO calendar year, week and a day_of_week.

Returns the number of days in month (value range: 1..12) taking account of the year.

Returns the number of days in year.

Returns true if year is a leap year in the proleptic Gregorian calendar.

Measures the execution time of block.

Returns a reading from the monotonic clock to measure elapsed time.

Parse datetime format specified by ISO 8601.

Returns a copy of this Time with span added.

Returns a copy of this Time with span added.

Returns a Time::Span amounting to the duration between other and self.

Returns a copy of this Time with span subtracted.

Returns a copy of this Time with span subtracted.

Compares this Time with other.

Compares this Time with other for equality.

Returns a copy of this Time representing the beginning of the day.

Returns a copy of this Time representing the beginning of the hour.

Returns a copy of this Time representing the beginning of the minute.

Returns a copy of this Time representing the beginning of the month.

Returns a copy of this Time representing the beginning of the quarter.

Returns a copy of this Time representing the beginning of the seconds.

Returns a copy of this Time representing the beginning of the semester.

Returns a copy of this Time representing the beginning of the week.

Returns a copy of this Time representing the beginning of the year.

Returns a copy of this Time representing the end of the day.

Returns a copy of this Time representing the end of the hour.

Returns a copy of this Time representing the end of the minute.

Returns a copy of this Time representing the end of the month.

Returns a copy of this Time representing the end of the quarter.

Returns a copy of this Time representing the end of the second.

Returns a copy of this Time representing the end of the semester.

Returns a copy of this Time representing the end of the week.

Returns a copy of this Time representing the end of the year.

Returns a copy of this Time representing midday (12:00) of the same day.

Returns the ISO calendar year and week in which this instance occurs.

Returns a Tuple with #year, #month and #day.

Returns the day of the month (1..31).

Returns the day of the week (Monday..Sunday).

Returns the day of the year.

Returns true if the day of week is Friday.

See Object#hash(hasher)

Returns the hour of the day (0..23).

Returns a copy of this Time representing the same instant observed in location.

Prints this Time to io.

Returns true if #location equals to the local time zone (Time::Location.local).

Returns Location representing the time-zone observed by this Time.

Returns the millisecond of the second (0..999).

Returns the minute of the hour (0..59).

Returns true if the day of week is Monday.

Returns the month of the year (1..12).

Returns the nanosecond of the second (0..999_999_999).

Returns the offset from UTC (in seconds) in effect in #location at this instant.

Returns true if the day of week is Saturday.

Returns the second of the minute (0..59).

Returns a copy of this Time shifted by the number of seconds and nanoseconds.

Returns a copy of this Time shifted by the amount of calendaric units provided as arguments.

Returns true if the day of week is Sunday.

Returns true if the day of week is Thursday.

Returns the duration between this Time and midnight of the same day.

Emits a string formatted according to RFC 3339 (ISO 8601 profile).

Returns a copy of this Time representing the same instant in the local time zone (Time::Location.local).

Creates a new Time instance with the same local date-time representation (wall clock) in a different location.

Format this time using the format specified by RFC 2822 into the given io.

Format this time using the format specified by RFC 2822.

Format this time using the format specified by RFC 3339 (ISO 8601 profile).

Format this time using the format specified by RFC 3339 (ISO 8601 profile).

Formats this Time according to the pattern in format to the given io.

Prints this Time to io.

Formats this Time according to the pattern in format.

Returns the number of seconds since the Unix epoch (1970-01-01 00:00:00Z).

Returns the number of seconds since the Unix epoch (1970-01-01 00:00:00Z) as Float64 with nanosecond precision.

Returns the number of milliseconds since the Unix epoch (1970-01-01 00:00:00Z).

Returns the number of nanoseconds since the Unix epoch (1970-01-01 00:00:00Z).

Returns a copy of this Time representing the same instant in UTC (Time::Location::UTC).

Returns true if the day of week is Tuesday.

Returns true if #location equals to Location::UTC.

Returns true if the day of week is Wednesday.

Returns the year of the proleptic Georgian Calendar (0..9999).

Returns the time zone in effect in #location at this instant.

Creates a new Time instance representing the given local date-time in location (defaults to local time zone).

Valid value ranges for the individual fields:

The time-of-day can be omitted and defaults to midnight (start of day):

The local date-time representation is resolved to a single instant based on the offset observed in the location at this time.

This process can sometimes be ambiguous, mostly due skipping or repeating times at time zone transitions. For example, in America/New_York the date-time 2011-03-13 02:15:00 never occurred, there is a gap between time zones. In return, 2011-11-06 01:15:00 occurred twice because of overlapping time zones.

In such cases, the choice of time zone, and therefore the time, is not well-defined. This method returns a time that is correct in one of the two zones involved in the transition, but it does not guarantee which.

Creates a new Time instance representing the current time from the system clock observed in location (defaults to local time zone).

Creates an instance representing the week-th day_of_week in the given year and month.

If week is 5 and there are not enough weeks in the given month (e.g. February in a non-leap year), the last week of the month is used instead.

Valid value ranges for the individual fields:

Reads a string from JSON parser as a time formatted according to RFC 3339 or other variations of ISO 8601.

The JSON format itself does not specify a time data type, this method just assumes that a string holding a ISO 8601 time format can be interpreted as a time value.

See #to_json for reference.

Creates a new Time instance that corresponds to the number of seconds and nanoseconds elapsed from epoch (0001-01-01 00:00:00.0) observed in location.

Valid range for seconds is 0..315_537_897_599. For nanoseconds it is 0..999_999_999.

Parses a Time from time string using the given pattern.

See Time::Format for details.

If there is no time zone information in the formatted time, location will be assumed. When location is nil, in such a case the parser will raise Time::Format::Error.

Parses a Time from time string using the given pattern.

See Time::Format for details.

If there is no time zone information in the formatted time, the parser will raise Time::Format::Error.

Parses a Time from time string using the given pattern and Time::Location.local as default location

See Time::Format for details.

Time::Location.local will only be used as #location if the formatted time does not contain any time zone information. The return value can't be assumed to be a UTC time (this can be achieved by calling #to_local).

Parse time format specified by RFC 2822.

This is also compatible to RFC 882 and RFC 1123.

Parse time format specified by RFC 3339 (ISO 8601 profile).

Parses a Time from time string using the given pattern and Time::Location::UTC as default location.

See Time::Format for details.

Time::Location::UTC will only be used as #location if the formatted time does not contain any time zone information. The return value can't be assumed to be a UTC time (this can be achieved by calling #to_utc).

Creates a new Time instance that corresponds to the number of seconds elapsed since the Unix epoch (1970-01-01 00:00:00Z).

The time zone is always UTC.

Creates a new Time instance that corresponds to the number of milliseconds elapsed since the Unix epoch (1970-01-01 00:00:00Z).

The time zone is always UTC.

Creates a new Time instance that corresponds to the number of nanoseconds elapsed since the Unix epoch (1970-01-01 00:00:00Z).

The time zone is always UTC.

Creates a new Time instance representing the given date-time in UTC.

Valid value ranges for the individual fields:

The time-of-day can be omitted and defaults to midnight (start of day):

Since UTC does not have any time zone transitions, each date-time is unambiguously resolved.

Creates a new Time instance representing the current time from the system clock in UTC.

Creates a new Time instance that corresponds to the number of seconds and nanoseconds elapsed from epoch (0001-01-01 00:00:00Z) in UTC.

Valid range for seconds is 0..315_537_897_599. For nanoseconds it is 0..999_999_999.

Creates an instance specified by a commercial week date consisting of ISO calendar year, week and a day_of_week.

This equates to the results from #calendar_week and #day_of_week.

Valid value ranges for the individual fields:

Returns the number of days in month (value range: 1..12) taking account of the year.

The returned value is either 28, 29, 30 or 31 depending on the month and whether year is leap.

Returns the number of days in year.

A normal year has 365 days, a leap year 366 days.

Returns true if year is a leap year in the proleptic Gregorian calendar.

Measures the execution time of block.

The measurement relies on the monotonic clock and is not affected by fluctuations of the system clock (see #monotonic).

Returns a reading from the monotonic clock to measure elapsed time.

Values from the monotonic clock and wall clock are not comparable. This method does not return a Time instance but a Time::Span amounting to the number of nanoseconds elapsed since the unspecified starting point of the monotonic clock. The returned values are strictly linearly increasing.

This clock should be independent from discontinuous jumps in the system time, such as leap seconds, time zone adjustments or manual changes to the computer's clock.

Subtracting two results from this method equals to the time elapsed between both readings:

The execution time of a block can be measured using .measure.

Parse datetime format specified by ISO 8601.

This is similar to .parse_rfc3339 but RFC 3339 defines a more strict format. In ISO 8601 for examples, field delimiters (#-, :) are optional.

Use #to_rfc3339 to format a Time according to .

Returns a copy of this Time with span added.

See #shift for details.

Returns a copy of this Time with span added.

It adds the number of months with overflow increasing the year. If the resulting day-of-month would be invalid, it is adjusted to the last valid day of the month.

For example, adding 1.month to 2007-03-31 would result in the invalid date 2007-04-31 which will be adjusted to 2007-04-30.

This operates on the local time-line, such that the local date-time representations of month and year are increased by the specified amount.

If the resulting date-time is ambiguous due to time zone transitions, a correct time will be returned, but it does not guarantee which.

Returns a Time::Span amounting to the duration between other and self.

The time span is negative if self is before other.

The duration amounts to the actual time elapsed between both instances, on the instant time-line. The difference between local date-time representations may equal to a different duration, depending on time zone transitions.

Returns a copy of this Time with span subtracted.

See #shift for details.

Returns a copy of this Time with span subtracted.

It adds the number of months with overflow decreasing the year. If the resulting day-of-month would be invalid, it is adjusted to the last valid day of the month.

For example, subtracting 1.month from 2007-05-31 would result in the invalid date 2007-04-31 which will be adjusted to 2007-04-30.

This operates on the local time-line, such that the local date-time representations of month and year are decreased by the specified amount.

If the resulting date-time is ambiguous due to time zone transitions, a correct time will be returned, but it does not guarantee which.

Compares this Time with other.

The comparison is based on the instant time-line, even if the local date-time representation (wall clock) would compare differently.

To ensure the comparison is also true for local wall clock, both date-times need to be transformed to the same time zone.

Compares this Time with other for equality.

Two instances are considered equal if they represent the same date-time in the instant time-line, even if they show a different local date-time.

Returns a copy of this Time representing the beginning of the day.

Returns a copy of this Time representing the beginning of the hour.

Returns a copy of this Time representing the beginning of the minute.

Returns a copy of this Time representing the beginning of the month.

Returns a copy of this Time representing the beginning of the quarter.

Returns a copy of this Time representing the beginning of the seconds.

This essentially resets nanoseconds to 0.

Returns a copy of this Time representing the beginning of the semester.

Returns a copy of this Time representing the beginning of the week.

The week starts on Monday by default, but can be configured by passing a different start_day as a Time::DayOfWeek.

Returns a copy of this Time representing the beginning of the year.

Returns a copy of this Time representing the end of the day.

Returns a copy of this Time representing the end of the hour.

Returns a copy of this Time representing the end of the minute.

Returns a copy of this Time representing the end of the month.

Returns a copy of this Time representing the end of the quarter.

Returns a copy of this Time representing the end of the second.

Returns a copy of this Time representing the end of the semester.

Returns a copy of this Time representing the end of the week.

Returns a copy of this Time representing the end of the year.

Returns a copy of this Time representing midday (12:00) of the same day.

Returns the ISO calendar year and week in which this instance occurs.

The ISO calendar year to which the week belongs is not always in the same as the year of the regular calendar date. The first three days of January sometimes belong to week 52 (or 53) of the previous year; equally the last three days of December sometimes are already in week 1 of the following year.

For that reason, this method returns a tuple year, week consisting of the calendar year to which the calendar week belongs and the ordinal number of the week within that year.

Together with #day_of_week this represents a specific day as commercial or week date format year, week, day_of_week in the same way as the typical format year, month, day. .week_date creates a Time instance from a week date.

Returns a Tuple with #year, #month and #day.

Returns the day of the month (1..31).

Returns the day of the week (Monday..Sunday).

Returns the day of the year.

The value range is 1..365 in normal years and 1..366 in leap years.

Returns true if the day of week is Friday.

See #day_of_week for details.

See Object#hash(hasher)

Returns the hour of the day (0..23).

Returns a copy of this Time representing the same instant observed in location.

This method changes the time zone and retains the instant, which will usually result in a different representation of local date-time (unless both locations have the same offset).

Ambiguous time zone transitions such as gaps and overlaps have no effect on the result because it retains the same instant.

In contrast, #to_local_in changes to a different location while preserving the same wall time, which results in different instants on the time line.

Prints this Time to io.

It's formatted according to the Internet Extended Date/Time Format (IXDTF) as specified in RFC 9557: An RFC 3339 formatted local date-time string with nanosecond precision followed by a time zone name suffix.

It is similar to the format %FT%T.%N%::z[%Z]. Some parts may be omitted or shortened.

Nanoseconds are omitted if with_nanoseconds is false or nanoseconds are zero. Zero offset seconds are omitted. The name of the location is omitted for fixed zone offset.

Returns true if #location equals to the local time zone (Time::Location.local).

Since the system's settings may change during a program's runtime, the result may not be identical between different invocations.

Returns Location representing the time-zone observed by this Time.

Returns the millisecond of the second (0..999).

Returns the minute of the hour (0..59).

Returns true if the day of week is Monday.

See #day_of_week for details.

Returns the month of the year (1..12).

Returns the nanosecond of the second (0..999_999_999).

Returns the offset from UTC (in seconds) in effect in #location at this instant.

Returns true if the day of week is Saturday.

See #day_of_week for details.

Returns the second of the minute (0..59).

Returns a copy of this Time shifted by the number of seconds and nanoseconds.

Positive values result in a later time, negative values in an earlier time.

This operates on the instant time-line, such that adding the equivalent of one hour will always be a duration of one hour later. The local date-time representation may change by a different amount, depending on time zone transitions.

Overflow in nanoseconds will be transferred to seconds.

There is no explicit limit on the input values but the addition must result in a valid time between 0001-01-01 00:00:00.0 and 9999-12-31 23:59:59.999_999_999. Otherwise ArgumentError is raised.

Returns a copy of this Time shifted by the amount of calendaric units provided as arguments.

Positive values result in a later time, negative values in an earlier time.

This operates on the local time-line, such that the local date-time representation of the result will be apart by the specified amounts, but the elapsed time between both instances might not equal to the combined default duration. This is the case for example when adding a day over a daylight-savings time change:

years is equivalent to 12 months and weeks is equivalent to 7 days.

If the day-of-month resulting from shifting by years and months would be invalid, the date is adjusted to the last valid day of the month. For example, adding one month to 2018-08-31 would result in the invalid date 2018-09-31 which will be adjusted to 2018-09-30:

Overflow in smaller units is transferred to the next larger unit.

Changes are applied in the same order as the arguments, sorted by increasing granularity. This is relevant because the order of operations can change the result:

There is no explicit limit on the input values but the shift must result in a valid time between 0001-01-01 00:00:00.0 and 9999-12-31 23:59:59.999_999_999. Otherwise ArgumentError is raised.

If the resulting date-time is ambiguous due to time zone transitions, a correct time will be returned, but it does not guarantee which.

Returns true if the day of week is Sunday.

See #day_of_week for details.

Returns true if the day of week is Thursday.

See #day_of_week for details.

Returns the duration between this Time and midnight of the same day.

This is equivalent to creating a Time::Span from the time-of-day fields:

Emits a string formatted according to RFC 3339 (ISO 8601 profile).

The JSON format itself does not specify a time data type, this method just assumes that a string holding a RFC 3339 time format will be interpreted as a time value.

See #from_json for reference.

Returns a copy of this Time representing the same instant in the local time zone (Time::Location.local).

Creates a new Time instance with the same local date-time representation (wall clock) in a different location.

Unlike #in, which always preserves the same instant in time, #to_local_in adjusts the instant such that it results in the same local date-time representation. Both instants are apart from each other by the difference in zone offsets.

If the given wall clock is a gap or fold in the target location, no unambiguous equivalent representation exists.

Format this time using the format specified by RFC 2822 into the given io.

This is also compatible to RFC 882 and RFC 1123.

Format this time using the format specified by RFC 2822.

This is also compatible to RFC 882 and RFC 1123.

Format this time using the format specified by RFC 3339 (ISO 8601 profile). into the given io.

Number of seconds decimals can be selected with fraction_digits. Values accepted are 0 (the default, no decimals), 3 (milliseconds), 6 (microseconds) or 9 (nanoseconds).

Format this time using the format specified by RFC 3339 (ISO 8601 profile).

ISO 8601 allows some freedom over the syntax and RFC 3339 exercises that freedom to rigidly define a fixed format intended for use in internet protocols and standards.

Number of seconds decimals can be selected with fraction_digits. Values accepted are 0 (the default, no decimals), 3 (milliseconds), 6 (microseconds) or 9 (nanoseconds).

Formats this Time according to the pattern in format to the given io.

See Time::Format for details.

Prints this Time to io.

The local date-time is formatted as date string YYYY-MM-DD HH:mm:ss +ZZ:ZZ:ZZ. Nanoseconds are always omitted. When the location is UTC, the offset is replaced with the string UTC. Offset seconds are omitted if 0.

Formats this Time according to the pattern in format.

See Time::Format for details.

Returns the number of seconds since the Unix epoch (1970-01-01 00:00:00Z).

Returns the number of seconds since the Unix epoch (1970-01-01 00:00:00Z) as Float64 with nanosecond precision.

Returns the number of milliseconds since the Unix epoch (1970-01-01 00:00:00Z).

Returns the number of nanoseconds since the Unix epoch (1970-01-01 00:00:00Z).

Returns a copy of this Time representing the same instant in UTC (Time::Location::UTC).

Returns true if the day of week is Tuesday.

See #day_of_week for details.

Returns true if #location equals to Location::UTC.

Returns true if the day of week is Wednesday.

See #day_of_week for details.

Returns the year of the proleptic Georgian Calendar (0..9999).

Returns the time zone in effect in #location at this instant.

**Examples:**

Example 1 (julia):
```julia
Time.utc                                        # returns the current time in UTC
Time.local Time::Location.load("Europe/Berlin") # returns the current time in time zone Europe/Berlin
Time.local                                      # returns the current time in current time zone
```

Example 2 (typescript):
```typescript
time = Time.utc(2016, 2, 15, 10, 20, 30)
time.to_s # => "2016-02-15 10:20:30 UTC"
time = Time.local(2016, 2, 15, 10, 20, 30, location: Time::Location.load("Europe/Berlin"))
time.to_s # => "2016-02-15 10:20:30 +01:00"
# The time-of-day can be omitted and defaults to midnight (start of day):
time = Time.utc(2016, 2, 15)
time.to_s # => "2016-02-15 00:00:00 UTC"
```

Example 3 (javascript):
```javascript
time = Time.utc(2016, 2, 15, 10, 20, 30)
time.year        # => 2016
time.month       # => 2
time.day         # => 15
time.hour        # => 10
time.minute      # => 20
time.second      # => 30
time.millisecond # => 0
time.nanosecond  # => 0
time.day_of_week # => Time::DayOfWeek::Monday
time.day_of_year # => 46
time.monday?     # => true
time.time_of_day # => 10:20:30
```

Example 4 (markdown):
```markdown
time.monday? # => true
# ...
time.sunday? # => false
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/Regex.html

**Contents:**
- class Regex
- Overview
- Included Modules
- Defined in:
- Constant Summary
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Regex::PCRE2
  - Class methods inherited from module Regex::PCRE2

A Regex represents a regular expression, a pattern that describes the contents of strings. A Regex can determine whether or not a string matches its description, and extract the parts of the string that match.

A Regex can be created using the literal syntax, in which it is delimited by forward slashes (/):

See Regex literals in the language reference.

Interpolation works in regular expression literals just as it does in string literals. Be aware that using this feature will cause an exception to be raised at runtime, if the resulting string would not be a valid regular expression.

When we check to see if a particular regular expression describes a string, we can say that we are performing a match or matching one against the other. If we find that a regular expression does describe a string, we say that it matches, and we can refer to a part of the string that was described as a match.

Here "haystack" does not contain the pattern /needle/, so it doesn't match:

Here "haystack" contains the pattern /hay/, so it matches:

Regex methods that perform a match usually return a truthy value if there was a match and nil if there was no match. After performing a match, the special variable $~ will be an instance of Regex::MatchData if it matched, nil otherwise.

When matching a regular expression using #=~ (either String#=~ or Regex#=~), the returned value will be the index of the first match in the string if the expression matched, nil otherwise.

When matching a regular expression using #match (either String#match or Regex#match), the returned value will be a Regex::MatchData if the expression matched, nil otherwise.

Regular expressions have their own language for describing strings.

Many programming languages and tools implement their own regular expression language, but Crystal uses PCRE2, a popular C library, with JIT compilation enabled for providing regular expressions. Here give a brief summary of the most basic features of regular expressions - grouping, repetition, and alternation - but the feature set of PCRE2 extends far beyond these, and we don't attempt to describe it in full here. For more information, refer to the PCRE2 documentation, especially the full pattern syntax or syntax quick reference.

NOTE Prior to Crystal 1.8 the compiler expected regex literals to follow the original PCRE pattern syntax. The following summary applies to both PCRE and PCRE2.

The regular expression language can be used to match much more than just the static substrings in the above examples. Certain characters, called metacharacters, are given special treatment in regular expressions, and can be used to describe more complex patterns. To match metacharacters literally in a regular expression, they must be escaped by being preceded with a backslash (\). .escape will do this automatically for a given String.

A group of characters (often called a capture group or subpattern) can be identified by enclosing it in parentheses (()). The contents of each capture group can be extracted on a successful match:

Capture groups are indexed starting from 1. Methods that accept a capture group index will usually also accept 0 to refer to the full match. Capture groups can also be given names, using the (?&lt;name&gt;...) syntax, as in the previous example.

Following a match, the special variables $N (e.g., $1, $2, $3, ...) can be used to access a capture group. Trying to access an invalid capture group will raise an exception. Note that it is possible to have a successful match with a nil capture:

This can be mitigated by using the nilable version of the above: $N?, (e.g., $1? $2?, $3?, ...). Changing the above to use $2? instead of $2 would return nil. $2?.nil? would return true.

A character or group can be repeated or made optional using an asterisk (* - zero or more), a plus sign (#+ - one or more), integer bounds in curly braces ({n,m}) (at least n, no more than m), or a question mark (?) (zero or one).

Alternatives can be separated using a vertical bar (|). Any single character can be represented by dot (.). When matching only one character, specific alternatives can be expressed as a character class, enclosed in square brackets ([]):

Regular expressions can be defined with these 3 optional flags:

PCRE2 supports other encodings, but Crystal strings are UTF-8 only, so Crystal regular expressions are also UTF-8 only (by default). Crystal strings are expected to contain only valid UTF-8 encodings, but that's not guaranteed. There's a chance that a string can contain invalid bytes. Especially data read from external sources must not be trusted to be valid encoding. The regex engine demands valid UTF-8, so it checks the encoding for every match. This can be unnecessary if the string is already validated (for example via String#valid_encoding? or because it has already been used in a previous regex match). If that's the case, it's profitable to skip UTF-8 validation via MatchOptions::NO_UTF_CHECK (or CompileOptions::NO_UTF_CHECK for the pattern).

PCRE2 optionally permits named capture groups (named subpatterns) to not be unique. Crystal exposes the name table of a Regex as a Hash of String => Int32, and therefore requires named capture groups to have unique names within a single Regex.

List of metacharacters that need to be escaped.

See Regex.needs_escape? and Regex.escape.

Creates a new Regex instance from a literal consisting of a pattern and the named parameter modifiers.

Creates a new Regex out of the given source String.

Determines Regex's source validity.

Returns a String constructed by escaping any metacharacters in str.

Returns true if char need to be escaped, false otherwise.

Returns true if str need to be escaped, false otherwise.

Returns true if the regex engine supports all options flags when compiling a pattern.

Returns true if the regex engine supports all options flags when matching a pattern.

Returns the number of (named & non-named) capture groups.

Returns a shallow copy of this object.

See Object#hash(hasher)

Prints to io an unambiguous string representation of this regular expression object.

Match at character index.

Match at character index.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Match at character index.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Matches a regular expression against str.

DEPRECATED Use the overload with Regex::MatchOptions instead.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Match at character index.

Match at character index.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Match at character index.

DEPRECATED Use the overload with Regex::MatchOptions instead.

DEPRECATED Use the overload with Regex::MatchOptions instead.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Returns a Hash where the values are the names of capture groups and the keys are their indexes.

Returns a Regex::CompileOptions representing the optional flags applied to this Regex.

Returns the original String representation of the Regex pattern.

Convert to String in subpattern format.

Creates a new Regex instance from a literal consisting of a pattern and the named parameter modifiers.

Creates a new Regex out of the given source String.

Union. Returns a Regex that matches any of patterns.

All capture groups in the patterns after the first one will have their indexes offset.

Union. Returns a Regex that matches any of patterns.

All capture groups in the patterns after the first one will have their indexes offset.

Determines Regex's source validity. If it is, nil is returned. If it's not, a String containing the error message is returned.

Returns a String constructed by escaping any metacharacters in str.

Returns true if char need to be escaped, false otherwise.

Returns true if str need to be escaped, false otherwise.

Returns true if the regex engine supports all options flags when compiling a pattern.

Returns true if the regex engine supports all options flags when matching a pattern.

Union. Returns a Regex that matches either of the operands.

All capture groups in the second operand will have their indexes offset.

Equality. Two regexes are equal if their sources and options are the same.

Case equality. This is equivalent to #match or #=~ but only returns true or false. Used in case expressions. The special variable $~ will contain a Regex::MatchData if there was a match, nil otherwise.

Match. Matches a regular expression against other and returns the starting position of the match if other is a matching String, otherwise nil. $~ will contain a Regex::MatchData if there was a match, nil otherwise.

Match. When the argument is not a String, always returns nil.

Returns the number of (named & non-named) capture groups.

Returns a shallow copy of this object.

This allocates a new object and copies the contents of self into it.

See Object#hash(hasher)

Prints to io an unambiguous string representation of this regular expression object.

Uses the regex literal syntax with basic option flags if sufficient (i.e. no other options than IGNORE_CASE, MULTILINE, or EXTENDED are set). Otherwise the syntax presents a Regex.new call.

Match at character index. Matches a regular expression against String str. Starts at the character index given by pos if given, otherwise at the start of str. Returns a Regex::MatchData if str matched, otherwise nil. $~ will contain the same value that was returned.

Match at character index. Matches a regular expression against String str. Starts at the character index given by pos if given, otherwise at the start of str. Returns a Regex::MatchData if str matched, otherwise nil. $~ will contain the same value that was returned.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Match at character index. Matches a regular expression against String str. Starts at the character index given by pos if given, otherwise at the start of str. Returns a Regex::MatchData if str matched, otherwise nil. $~ will contain the same value that was returned.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Matches a regular expression against str. This starts at the character index pos if given, otherwise at the start of str. Returns a Regex::MatchData if str matched, otherwise raises Regex::Error. $~ will contain the same value if matched.

Match at byte index. Matches a regular expression against String str. Starts at the byte index given by pos if given, otherwise at the start of str. Returns a Regex::MatchData if str matched, otherwise nil. $~ will contain the same value that was returned.

Match at byte index. Matches a regular expression against String str. Starts at the byte index given by pos if given, otherwise at the start of str. Returns a Regex::MatchData if str matched, otherwise nil. $~ will contain the same value that was returned.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Match at byte index. Matches a regular expression against String str. Starts at the byte index given by pos if given, otherwise at the start of str. Returns a Regex::MatchData if str matched, otherwise nil. $~ will contain the same value that was returned.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Match at character index. It behaves like #match, however it returns Bool value. It neither returns MatchData nor assigns it to the $~ variable.

Match at character index. It behaves like #match, however it returns Bool value. It neither returns MatchData nor assigns it to the $~ variable.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Match at character index. It behaves like #match, however it returns Bool value. It neither returns MatchData nor assigns it to the $~ variable.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Match at byte index. It behaves like #match_at_byte_index, however it returns Bool value. It neither returns MatchData nor assigns it to the $~ variable.

Match at byte index. It behaves like #match_at_byte_index, however it returns Bool value. It neither returns MatchData nor assigns it to the $~ variable.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Match at byte index. It behaves like #match_at_byte_index, however it returns Bool value. It neither returns MatchData nor assigns it to the $~ variable.

DEPRECATED Use the overload with Regex::MatchOptions instead.

Returns a Hash where the values are the names of capture groups and the keys are their indexes. Non-named capture groups will not have entries in the Hash. Capture groups are indexed starting from 1.

Returns a Regex::CompileOptions representing the optional flags applied to this Regex.

Returns the original String representation of the Regex pattern.

Convert to String in subpattern format. Produces a String which can be embedded in another Regex via interpolation, where it will be interpreted as a non-capturing subexpression in another regular expression.

**Examples:**

Example 1 (javascript):
```javascript
/hay/ =~ "haystack"   # => 0
/y/.match("haystack") # => Regex::MatchData("y")
```

Example 2 (javascript):
```javascript
x = "a"
/#{x}/.match("asdf") # => Regex::MatchData("a")
x = "("
/#{x}/ # raises ArgumentError
```

Example 3 (javascript):
```javascript
/needle/.match("haystack") # => nil
```

Example 4 (javascript):
```javascript
/hay/.match("haystack") # => Regex::MatchData("hay")
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/UUID.html

**Contents:**
- struct UUID
- Overview
- Included Modules
- Defined in:
- Constructors
- Class Method Summary
- Instance Method Summary
  - Instance methods inherited from module Comparable(UUID)
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct

Represents a UUID (Universally Unique IDentifier).

NOTE To use UUID, you must explicitly import it with require "uuid"

Generates an empty UUID.

Generates UUID from bytes, applying version and variant to the UUID if present.

Creates UUID from 16-bytes slice.

Creates another UUID which is a copy of uuid, but allows overriding variant or version.

Creates new UUID by decoding value string from hyphenated (ie ba714f86-cac6-42c7-8956-bcf5105e1b81), hexstring (ie 89370a4ab66440c8add39e06f2bb6af6) or URN (ie urn:uuid:3f9eaf9e-cdb0-45cc-8ecb-0e5b2bfb0c20) format, raising an ArgumentError if the string does not match any of these formats.

Creates UUID from YAML using YAML::ParseContext.

Creates UUID from JSON using JSON::PullParser.

Generates RFC 4122 v4 UUID.

Generates RFC 4122 v1 UUID.

Generates RFC 4122 v2 UUID.

Generates RFC 4122 v3 UUID using the name to generate the UUID, it can be a string of any size.

Generates RFC 4122 v4 UUID.

Generates RFC 4122 v5 UUID using the name to generate the UUID, it can be a string of any size.

Deserializes the given JSON key into a UUID.

Creates new UUID by decoding value string from hyphenated (ie ba714f86-cac6-42c7-8956-bcf5105e1b81), hexstring (ie 89370a4ab66440c8add39e06f2bb6af6) or URN (ie urn:uuid:3f9eaf9e-cdb0-45cc-8ecb-0e5b2bfb0c20) format, returning nil if the string does not match any of these formats.

Generates RFC 4122 v3 UUID with the Namespace::DNS.

Generates RFC 4122 v3 UUID with the Namespace::OID.

Generates RFC 4122 v3 UUID with the Namespace::URL.

Generates RFC 4122 v3 UUID with the Namespace::X500.

Generates RFC 4122 v5 UUID with the Namespace::DNS.

Generates RFC 4122 v5 UUID with the Namespace::OID.

Generates RFC 4122 v5 UUID with the Namespace::URL.

Generates RFC 4122 v5 UUID with the Namespace::X500.

Generates an RFC9562-compatible v7 UUID, allowing the values to be sorted chronologically (with 1ms precision) by their raw or hexstring representation.

The comparison operator.

Returns the binary representation of the UUID.

See Object#hash(hasher)

Convert to String in literal format.

Returns UUID as JSON value.

Same as #inspect(io).

Returns unsafe pointer to 16-bytes.

Returns UUID as YAML value.

Returns a String that is a valid urn of self

Returns true if UUID is a V1, raises Error otherwise.

Returns true if UUID is a V1, false otherwise.

Returns true if UUID is a V2, raises Error otherwise.

Returns true if UUID is a V2, false otherwise.

Returns true if UUID is a V3, raises Error otherwise.

Returns true if UUID is a V3, false otherwise.

Returns true if UUID is a V4, raises Error otherwise.

Returns true if UUID is a V4, false otherwise.

Returns true if UUID is a V5, raises Error otherwise.

Returns true if UUID is a V5, false otherwise.

Returns true if UUID is a V7, raises Error otherwise.

Returns true if UUID is a V7, false otherwise.

Returns UUID variant based on the RFC4122 format.

Returns version based on RFC4122 format.

Generates an empty UUID.

Generates UUID from bytes, applying version and variant to the UUID if present.

Creates UUID from 16-bytes slice. Raises if slice isn't 16 bytes long. See #initialize for variant and version.

Creates another UUID which is a copy of uuid, but allows overriding variant or version.

Creates new UUID by decoding value string from hyphenated (ie ba714f86-cac6-42c7-8956-bcf5105e1b81), hexstring (ie 89370a4ab66440c8add39e06f2bb6af6) or URN (ie urn:uuid:3f9eaf9e-cdb0-45cc-8ecb-0e5b2bfb0c20) format, raising an ArgumentError if the string does not match any of these formats.

Creates UUID from YAML using YAML::ParseContext.

NOTE require "uuid/yaml" is required to opt-in to this feature.

Creates UUID from JSON using JSON::PullParser.

NOTE require "uuid/json" is required to opt-in to this feature.

Generates RFC 4122 v4 UUID.

It is strongly recommended to use a cryptographically random source for random, such as Random::Secure.

Generates RFC 4122 v1 UUID.

The traditional method for generating a node_id involves using the machine’s MAC address. However, this approach is only effective if there is only one process running on the machine and if privacy is not a concern. In modern languages, the default is to prioritize security and privacy. Therefore, a pseudo-random node_id is generated as described in section 4.5 of the RFC.

The sequence number clock_seq is used to generate the UUID. This number should be monotonically increasing, with only 14 bits of the clock sequence being used effectively. The clock sequence should be stored in a stable location, such as a file. If it is not stored, a random value is used by default. If not provided the current time milliseconds are used. In case the traditional MAC address based approach should be taken the node_id can be provided. Otherwise secure random is used.

Generates RFC 4122 v2 UUID.

Version 2 UUIDs are generated using the current time, the local machine’s MAC address, and the local user or group ID. However, they are not widely used due to their limitations. For a given domain/id pair, the same token may be returned for a duration of up to 7 minutes and 10 seconds.

The id depends on the domain, for the Domain::Person usually the local user id (uid) is used, for Domain::Group usually the local group id (gid) is used. In case the traditional MAC address based approach should be taken the node_id can be provided. Otherwise secure random is used.

Generates RFC 4122 v3 UUID using the name to generate the UUID, it can be a string of any size. The namespace specifies the type of the name, usually one of Namespace.

Generates RFC 4122 v4 UUID.

It is strongly recommended to use a cryptographically random source for random, such as Random::Secure.

Generates RFC 4122 v5 UUID using the name to generate the UUID, it can be a string of any size. The namespace specifies the type of the name, usually one of Namespace.

Deserializes the given JSON key into a UUID.

NOTE require "uuid/json" is required to opt-in to this feature.

Creates new UUID by decoding value string from hyphenated (ie ba714f86-cac6-42c7-8956-bcf5105e1b81), hexstring (ie 89370a4ab66440c8add39e06f2bb6af6) or URN (ie urn:uuid:3f9eaf9e-cdb0-45cc-8ecb-0e5b2bfb0c20) format, returning nil if the string does not match any of these formats.

Generates RFC 4122 v3 UUID with the Namespace::DNS.

Generates RFC 4122 v3 UUID with the Namespace::OID.

Generates RFC 4122 v3 UUID with the Namespace::URL.

Generates RFC 4122 v3 UUID with the Namespace::X500.

Generates RFC 4122 v5 UUID with the Namespace::DNS.

Generates RFC 4122 v5 UUID with the Namespace::OID.

Generates RFC 4122 v5 UUID with the Namespace::URL.

Generates RFC 4122 v5 UUID with the Namespace::X500.

Generates an RFC9562-compatible v7 UUID, allowing the values to be sorted chronologically (with 1ms precision) by their raw or hexstring representation.

The comparison operator. Returns 0 if the two objects are equal, a negative number if this object is considered less than other, a positive number if this object is considered greater than other, or nil if the two objects are not comparable.

Subclasses define this method to provide class-specific ordering.

The comparison operator is usually used to sort values:

Returns the binary representation of the UUID.

See Object#hash(hasher)

Convert to String in literal format.

Returns UUID as JSON value.

NOTE require "uuid/json" is required to opt-in to this feature.

Same as #inspect(io).

Returns unsafe pointer to 16-bytes.

Returns UUID as YAML value.

NOTE require "uuid/yaml" is required to opt-in to this feature.

Returns a String that is a valid urn of self

Returns true if UUID is a V1, raises Error otherwise.

Returns true if UUID is a V1, false otherwise.

Returns true if UUID is a V2, raises Error otherwise.

Returns true if UUID is a V2, false otherwise.

Returns true if UUID is a V3, raises Error otherwise.

Returns true if UUID is a V3, false otherwise.

Returns true if UUID is a V4, raises Error otherwise.

Returns true if UUID is a V4, false otherwise.

Returns true if UUID is a V5, raises Error otherwise.

Returns true if UUID is a V5, false otherwise.

Returns true if UUID is a V7, raises Error otherwise.

Returns true if UUID is a V7, false otherwise.

Returns UUID variant based on the RFC4122 format. See also #version

Returns version based on RFC4122 format. See also #variant.

**Examples:**

Example 1 (javascript):
```javascript
UUID.empty # => UUID(00000000-0000-4000-0000-000000000000)
```

Example 2 (php):
```php
require "yaml"
require "uuid"
require "uuid/yaml"

class Example
  include YAML::Serializable

  property id : UUID
end

example = Example.from_yaml("id: 50a11da6-377b-4bdf-b9f0-076f9db61c93")
example.id # => UUID(50a11da6-377b-4bdf-b9f0-076f9db61c93)
```

Example 3 (json):
```json
require "json"
require "uuid"
require "uuid/json"

class Example
  include JSON::Serializable

  property id : UUID
end

example = Example.from_json(%({"id": "ba714f86-cac6-42c7-8956-bcf5105e1b81"}))
example.id # => UUID(ba714f86-cac6-42c7-8956-bcf5105e1b81)
```

Example 4 (json):
```json
# Sort in a descending way:
[3, 1, 2].sort { |x, y| y <=> x } # => [3, 2, 1]

# Sort in an ascending way:
[3, 1, 2].sort { |x, y| x <=> y } # => [1, 2, 3]
```

---

## Crystal

**URL:** https://crystal-lang.org/api/1.18.2/YAML/Any.html

**Contents:**
- struct YAML::Any
- Overview
- Defined in:
- Constructors
- Instance Method Summary
  - Instance methods inherited from struct Struct
  - Class methods inherited from struct Struct
  - Instance methods inherited from struct Value
  - Instance methods inherited from class Object
  - Class methods inherited from class Object

YAML::Any is a convenient wrapper around all possible YAML core types (YAML::Any::Type) and can be used for traversing dynamic or unknown YAML structures.

Note that methods used to traverse a YAML structure, #[], #[]? and #each, always return a YAML::Any to allow further traversal. To convert them to String, Array, etc., use the as_ methods, such as #as_s, #as_a, which perform a type check against the raw underlying value. This means that invoking #as_s when the underlying value is not a String will raise: the value won't automatically be converted (parsed) to a String. There are also nil-able variants (#as_i?, #as_s?, ...), which return nil when the underlying value type won't match.

Creates a YAML::Any that wraps the given Type.

Creates a YAML::Any that wraps the given Type.

Creates a YAML::Any that wraps the given Type.

Returns true if both self and other's raw object are equal.

Returns true if the raw object is equal to other.

Assumes the underlying value is an Array or Hash and returns the element at the given index_or_key.

Assumes the underlying value is an Array or Hash and returns the element at the given index_or_key, or nil if out of bounds or the key is missing.

Checks that the underlying value is Array, and returns its value.

Checks that the underlying value is Array, and returns its value.

Checks that the underlying value is Bool, and returns its value.

Checks that the underlying value is Bool, and returns its value.

Checks that the underlying value is Bytes, and returns its value.

Checks that the underlying value is Bytes, and returns its value.

Checks that the underlying value is Float (or Int), and returns its value.

Checks that the underlying value is Float (or Int), and returns its value as an Float32.

Checks that the underlying value is Float (or Int), and returns its value as an Float32.

Checks that the underlying value is Float (or Int), and returns its value.

Checks that the underlying value is Hash, and returns its value.

Checks that the underlying value is Hash, and returns its value.

Checks that the underlying value is Int64, and returns its value as Int32.

Checks that the underlying value is Int64, and returns its value.

Checks that the underlying value is Int64, and returns its value.

Checks that the underlying value is Int64, and returns its value as Int32.

Checks that the underlying value is Nil, and returns nil.

Checks that the underlying value is String, and returns its value.

Checks that the underlying value is String, and returns its value.

Checks that the underlying value is Time, and returns its value.

Checks that the underlying value is Time, and returns its value.

Returns a new YAML::Any instance with the #raw value #cloneed.

Traverses the depth of a structure and returns the value, otherwise raises.

Traverses the depth of a structure and returns the value.

Returns a new YAML::Any instance with the #raw value #duped.

See Object#hash(hasher)

Appends this struct's name and instance variables names and values to the given IO.

Returns the raw underlying value, a Type.

Assumes the underlying value is an Array or Hash and returns its size.

Forwards #to_json_object_key to #raw if it responds to that method, raises JSON::Error otherwise.

Same as #inspect(io).

Creates a YAML::Any that wraps the given Type.

Creates a YAML::Any that wraps the given Type.

Creates a YAML::Any that wraps the given Type.

Returns true if both self and other's raw object are equal.

Returns true if the raw object is equal to other.

Assumes the underlying value is an Array or Hash and returns the element at the given index_or_key.

Raises if the underlying value is not an Array nor a Hash.

Assumes the underlying value is an Array or Hash and returns the element at the given index_or_key, or nil if out of bounds or the key is missing.

Raises if the underlying value is not an Array nor a Hash.

Checks that the underlying value is Array, and returns its value. Raises otherwise.

Checks that the underlying value is Array, and returns its value. Returns nil otherwise.

Checks that the underlying value is Bool, and returns its value. Raises otherwise.

Checks that the underlying value is Bool, and returns its value. Returns nil otherwise.

Checks that the underlying value is Bytes, and returns its value. Raises otherwise.

Checks that the underlying value is Bytes, and returns its value. Returns nil otherwise.

Checks that the underlying value is Float (or Int), and returns its value. Raises otherwise.

Checks that the underlying value is Float (or Int), and returns its value as an Float32. Raises otherwise.

Checks that the underlying value is Float (or Int), and returns its value as an Float32. Returns nil otherwise.

Checks that the underlying value is Float (or Int), and returns its value. Returns nil otherwise.

Checks that the underlying value is Hash, and returns its value. Raises otherwise.

Checks that the underlying value is Hash, and returns its value. Returns nil otherwise.

Checks that the underlying value is Int64, and returns its value as Int32. Raises otherwise.

Checks that the underlying value is Int64, and returns its value. Raises otherwise.

Checks that the underlying value is Int64, and returns its value. Returns nil otherwise.

Checks that the underlying value is Int64, and returns its value as Int32. Returns nil otherwise.

Checks that the underlying value is Nil, and returns nil. Raises otherwise.

Checks that the underlying value is String, and returns its value. Raises otherwise.

Checks that the underlying value is String, and returns its value. Returns nil otherwise.

Checks that the underlying value is Time, and returns its value. Raises otherwise.

Checks that the underlying value is Time, and returns its value. Returns nil otherwise.

Returns a new YAML::Any instance with the #raw value #cloneed.

Traverses the depth of a structure and returns the value, otherwise raises.

Traverses the depth of a structure and returns the value. Returns nil if not found.

Returns a new YAML::Any instance with the #raw value #duped.

See Object#hash(hasher)

Appends this struct's name and instance variables names and values to the given IO.

Returns the raw underlying value, a Type.

Assumes the underlying value is an Array or Hash and returns its size.

Raises if the underlying value is not an Array or Hash.

Forwards #to_json_object_key to #raw if it responds to that method, raises JSON::Error otherwise.

Same as #inspect(io).

**Examples:**

Example 1 (yaml):
```yaml
require "yaml"

data = YAML.parse <<-YAML
         ---
         foo:
           bar:
             baz:
               - qux
               - fox
         YAML
data["foo"]["bar"]["baz"][0].as_s # => "qux"
data["foo"]["bar"]["baz"].as_a    # => ["qux", "fox"]
```

Example 2 (python):
```python
struct Point
  def initialize(@x : Int32, @y : Int32)
  end
end

p1 = Point.new 1, 2
p1.to_s    # "Point(@x=1, @y=2)"
p1.inspect # "Point(@x=1, @y=2)"
```

---
