include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::Filtering
include Nanoc3::Helpers::Breadcrumbs
include Nanoc3::Helpers::Tagging
include Nanoc3::Helpers::Blogging

class HTMLCodeStyle < Nanoc3::Filter
  identifier :htmlcodestyle
  type :text
  
  def run(content, params={})
    result = content
    
    # Replace all single-quoted attributes to double-quoted
    result.gsub!(/=\'([^\'\"]+)\'/, '="\1"') #'

    # Remove underscores and make IDs CamelCased if there are no Uppercases in id
    result.gsub!(/(<html)? id="_*([^"A-Z]*)"/){
      if !$1
        ' id="' + $2.split("_").collect{|x|x.capitalize}.join() + '"'
      else
        $1 + ' id="' + $2 + '"'
      end
    }
    
    # Tabs to spaces (minus one tag for beautier indent)
    result.gsub!(/^((  )+)/){
      ' ' * ($1.length/2-1)
    }

    return result
  end
end

class CSSMerge < Nanoc3::Filter
  identifier :cssmerge
  type :text
  
  def run(content, params={})
    result = content
    
    result.gsub!(/(\.b-.+) \.([-_]|__)([^-_\s].*\{)/, '\1\2\3')

    return result
  end
end
